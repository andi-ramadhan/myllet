import fs from "fs/promises";
import path from "path";
import { Transaction } from "../models/Transaction";

const FILE_PATH = path.join(__dirname, "../../data/transactions.json");

export async function loadTransactions(): Promise<Transaction[]> {
  try {
    await fs.access(FILE_PATH); // check if files exists and can be used
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data) as Transaction[];
  } catch (error: any) {
    // ENOENT is an error code for non-existing file
    if (error.code === "ENOENT") {
      return [];
    }
    throw new Error(`Failed to read data: ${error.message}`);
  }
}

export async function saveTransactions(
  transactions: Transaction[],
): Promise<void> {
  try {
    const dir = path.dirname(FILE_PATH);
    await fs.mkdir(dir, { recursive: true });

    const dataString = JSON.stringify(transactions, null, 2);
    await fs.writeFile(FILE_PATH, dataString, "utf-8");
  } catch (error: any) {
    throw new Error(`Failed to save data: ${error.message}`);
  }
}
