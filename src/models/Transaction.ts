export type TransactionType = "income" | "outcome";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
}
