export interface FundEntry {
  _id?: string;
  amount: number;
  date?: string;
  note?: string;
  type?: 'income' | 'expense';
}

export interface FundSummary {
  childrenFund: FundEntry[];
  internalFund: FundEntry[];
}
