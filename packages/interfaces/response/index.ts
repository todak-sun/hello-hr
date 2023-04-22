export type ResMeta = {
  apiVersion: string;
};

export interface ResOne<T> {
  content: T;
  meta: ResMeta;
}

export interface ResList<T> {
  content: T[];
  size: number;
  meta: ResMeta;
}

export interface Pagination {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

export interface ResPage<T> extends ResList<T> {
  pagination: Pagination;
}
