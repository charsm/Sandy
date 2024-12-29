export type BaseConfig = {
  title: string;
  baseUrl?: string;
  description?: string;
};

export type Category = {
  title: string;
  key: string;
};

export type BlogConfig = {
  base: BaseConfig;
  categories: Category[];
};
