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
