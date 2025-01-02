import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import generateOgImage from "~/utils/generateOgImage";

export async function getStaticPaths() {
  const posts = await getCollection("posts").then((p) =>
    p.filter(({ data }) => !data.isDraft)
  );
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}

export async function GET({
  props,
}: {
  props: CollectionEntry<"posts">;
}): Promise<APIRoute> {
  return generateOgImage(props) as unknown as APIRoute;
}
