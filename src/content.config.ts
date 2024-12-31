import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    isDraft: z.boolean().optional().default(false),
    title: z.string(),
    pubDate: z.date(),
    menu: z.enum(["tech", "reflection", "tech"]),
    description: z.string().optional().default(""),
  }),
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./data/posts" }),
});

export const collections = {
  posts,
};
