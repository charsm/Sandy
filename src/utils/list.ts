import type { PathParams } from "~/types/common";
import type { Menu } from "~/types/config";

export const processMenu = (
  items: Menu[],
  parentUrl: string = "",
  menuKey?: string
): PathParams[] => {
  if (!items?.length) return [];

  return items.reduce<PathParams[]>((acc, item) => {
    // 处理有子菜单且匹配 menuKey 的情况
    if (item.children?.length && item.key === menuKey) {
      const childPaths = processMenu(
        item.children,
        item.url || parentUrl,
        menuKey
      );
      return [...acc, ...childPaths];
    }

    // 构建路径参数
    const pathParam: PathParams = {
      params: {
        parent: parentUrl.replace(/^\//, "") ?? "",
        sub: item.url?.replace(/^\//, "") ?? "",
      },
    };

    // 过滤掉无效的路径参数
    if (pathParam.params.parent && pathParam.params.sub) {
      return [...acc, pathParam];
    }

    return acc;
  }, []);
};
