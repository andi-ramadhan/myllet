import { Command } from "commander";
import { addTransaction } from "./commands/add";

const program = new Command();

program
  .name("myllet")
  .description("Simple CLI tool for tracking finance")
  .version("1.0.0");

program
  .command("add")
  .description("Take notes for income or outcome finance")
  .argument("<type>", 'Transaction Type ("income" or "outcome")')
  .argument("<amount>", "Total money (example: 50000)")
  .argument(
    "<description>",
    "Transaction description (use quotation mark if more than 1 word)",
  )
  .action(async (type: string, amount: string, description: string) => {
    await addTransaction(type, amount, description);
  });

program.parse(process.argv); // so Commander can process this terminal input
