import Giscus from "@giscus/react";
import useTheme from '~/hooks/useTheme'

export default function Comment() {
  const {colorMode} = useTheme()
  return (
    <Giscus
      id="comments"
      repo="charlesMYoung/comment"
      repoId="R_kgDOL338Cg"
      category="Announcements"
      categoryId="DIC_kwDOL338Cs4CfLVy"
      mapping="title"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode}
      lang="en"
      loading="lazy"
    />
  );
};
