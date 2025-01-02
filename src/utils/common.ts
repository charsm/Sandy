import type { TransitionDirectionalAnimations } from "astro";

export const removeSlash = (str: string) => str.replace(/^\//, "");

export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((result: Record<string, T[]>, currentValue) => {
    const keyValue = currentValue[key] as unknown as string; // Cast the key value to string
    (result[keyValue] = result[keyValue] ?? []).push(currentValue);
    return result;
  }, {});
};

export const groupByArray = <T>(array: T[], key: keyof T) => {
  return Object.entries(groupBy(array, key))
    .map(([key, value]) => ({
      key,
      value,
    }))
    .sort((a, b) => {
      return +b.key - +a.key;
    });
};

export const animation: TransitionDirectionalAnimations = {
  forwards: {
    old: {
      name: "slide-in",
    },
    new: {
      name: "slide-in",
      duration: "0.35s",
      easing: "ease-in-out",
    },
  },
  backwards: {
    old: {
      name: "slide-in",
    },
    new: {
      name: "slide-in",
      duration: "0.35s",
      easing: "ease-in-out",
    },
  },
};
