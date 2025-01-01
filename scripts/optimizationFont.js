import Fontmin from "fontmin";
import * as glob from "glob";
import matter from "gray-matter";

const markdownFiles = glob.sync(["data/**/*.{md,mdx}", "src/pages/**/*.mdx"]);
const frontMatters = markdownFiles.map((file) => matter.read(file));

const textSubset = frontMatters
  .map(
    ({ data: { title, description }, content }) =>
      `${title}${description}${content}`
  )
  .join("");
console.log("markdownFiles", textSubset);
const fontmin = new Fontmin()
  // 字体的源文件
  .src("public/fonts/SmileySans-Oblique.otf.woff2")
  .use(
    Fontmin.glyph({
      text: textSubset,
      hinting: false,
    })
  )
  // 文件生成成后放在网站的资源目录中，Rollup在后面会复制到dist目录里去
  .dest("public/fonts");
// 开始精简字体
fontmin.run((err, files) => {
  console.log("files", files);
  if (err) throw err;
  console.log("compress font success\n");
});
