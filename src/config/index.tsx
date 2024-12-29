import type { BlogConfig } from "~/types/config";

export const Config: BlogConfig = {
  base: {
    title: "NextUI Blog",
    description: "A blog built with NextUI",
    baseUrl: "https://nextui-org.github.io/blog",
  },
  categories: [
    {
      title: "随笔",
      key: "reflection",
    },
    {
      title: "技术",
      key: "tech",
    },
    {
      title: "笔记",
      key: "note",
    },
  ],
};
