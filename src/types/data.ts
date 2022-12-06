export interface INewCategory {
  label: string;
  userId: number;
}

export interface ICategory extends INewCategory {
  id: number;
}

export interface INewTransaction {
  date: string;
  categoryId: number;
  userId: number;
  label: string;
  amount: number;
}

export interface ITransaction extends INewTransaction {
  id: number;
}

export interface ICategoriesResponse {
  categories: ICategory[];
}

export interface ITransactionsResponse {
  transactions: ITransaction[];
  pagination?: IPagination;
  sort?: [{}];
  filter?: {};
}

export interface IDataState extends ICategoriesResponse, ITransactionsResponse {
  totalIncome: number;
  totalExpense: number;
  totalTransactions: number;
  isFetching: boolean;
}

export interface IPagination {
  page?: number;
  skip?: number;
  limit?: number;
  totalPages?: number;
  totalElements?: number;
  isFistPage?: boolean;
  isLastPage?: boolean;
}

export interface ITransactionQueryProps extends IPagination {
  sort?: string;
  order?: string;
  filter?: string;
}
