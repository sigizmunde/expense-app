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
  pagination?: {
    page: number;
    skip: number;
    limit: number;
    totalPages: number;
    totalElements: number;
    isFistPage?: boolean;
    isLastPage?: boolean;
  };
  sort?: [{}];
  filter?: {};
}

export interface IDataState extends ICategoriesResponse, ITransactionsResponse {
  isFetching: boolean;
}
