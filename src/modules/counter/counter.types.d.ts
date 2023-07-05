export type CounterResponse = {
  _id?: string;
  title: string;
  description: string;
  message: string;
  count: number;
  status: number;
  reset_counter: number;
  completition_date?: string;
  created_at: string;
  updated_at: string;
};

export type CounterAPI = {
  items: CounterResponse[];
  paginator: {
    totalItems: number;
    offset: number;
    limit: number;
    totalPages: number;
    currentPage: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prev: number | null;
    next: number | null;
  };
};
