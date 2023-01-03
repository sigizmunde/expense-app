export interface INewCategory {
  label: string;
  userId: number;
  color?: string;
  image?: unknown | null;
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
  sort?: { [key: string]: string }[];
  filter?: unknown;
}

export interface IDataState extends ICategoriesResponse, ITransactionsResponse {
  totalIncome: number;
  totalExpense: number;
  totalTransactions: number;
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

export type TSort = { [key: string]: string }[];

export interface ITransactionQueryProps extends IPagination {
  sort?: TSort;
  filter?: string;
}

export interface ITotalInfo {
  totalIncome: number;
  totalExpense: number;
  totalTransactions: number;
}

export interface ICircleDiagramDataRecord {
  id: number;
  name: string;
  value: number;
  fill: string;
}

export interface IAreaDiagramDataRecord {
  id: number;
  name?: string;
  expense?: number;
  income?: number;
}

export interface IStatisticsState extends ITransactionsResponse {
  dateFrom: string;
  dateTo: string;
}

export interface IStatisticsQueryProps {
  dateFrom: string;
  dateTo: string;
}

export type TPeriodType = 'day' | 'week' | 'month' | 'year';
