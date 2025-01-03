import { NotebookText } from "lucide-react";
import type { BlogConfig } from "~/types/config";

export const Config: BlogConfig = {
  base: {
    title: "NextUI Blog",
    description: "A blog built with NextUI",
    baseUrl: "http://localhost:4321",
    author: "NextUI",
  },
  menus: [
    {
      title: "文章",
      url: "/blog",
      key: "blog",
      icon: <NotebookText size={20} />,
      children: [
        {
          title: "随笔",
          url: "/reflection",
        },
        {
          title: "技术",
          url: "/tech",
        },
        {
          title: "笔记",
          url: "/note",
        },
        {
          title: "日志",
          url: "/log",
        },
      ],
    },
  ],
};
