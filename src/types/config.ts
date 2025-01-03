export type BaseConfig = {
  title: string;
  baseUrl?: string;
  description?: string;
  author?: string;
};

export type Menu = {
  title: string;
  url: string;
  key?: string;
  isJump?: boolean;
  icon?: React.ReactNode;
  children?: Menu[];
};

export type BlogConfig = {
  base: BaseConfig;
  menus: Menu[];
};
