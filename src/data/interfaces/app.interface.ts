export interface ISubscriptions {
  name?: string;
  price?: number;
}

export interface IApp {
  id: string;
  name: string;
  description: string;
  categories?: string[];
  subscriptions?: ISubscriptions[];
}
