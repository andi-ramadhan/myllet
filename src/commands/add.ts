import { randomUUID } from "crypto";
import { Transaction, TransactionType } from "../models/Transaction";
import { loadTransactions, saveTransactions } from "../services/storage";

export async function addTransaction(
  type: string,
  amountStr: string,
  description: string,
) {
  try {
    // input validation
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      console.error("Error: Total amount should be a number and more than 0.");
      process.exit(1);
    }

    if (type !== "income" && type !== "outcome") {
      console.error(
        'Error: Transaction not allowed, please use "income" or "outcome" only.',
      );
      process.exit(1);
    }

    const transactions = await loadTransactions();

    const newTransaction: Transaction = {
      id: randomUUID(),
      type: type as TransactionType,
      amount: amount,
      description: description,
      date: new Date().toISOString(),
    };

    transactions.push(newTransaction);
    await saveTransactions(transactions);

    console.log(
      `Transaction notes success [${type.toUpperCase()}] ${description} amount Rp${amount}`,
    );
  } catch (error: any) {
    console.error(`Failed to add transaction: ${error.message}`);
  }
}
