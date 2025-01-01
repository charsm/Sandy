import Fontmin from "fontmin";

export const optimizationFont = async (allText: string) => {
  const fontmin = new Fontmin()
    // 字体的源文件
    .src("/fonts/SmileySans-Oblique.otf.woff2")
    .use(
      Fontmin.glyph({
        text: allText,
        hinting: false,
      })
    )
    // 文件生成成后放在网站的资源目录中，Rollup在后面会复制到dist目录里去
    .dest("fonts");
  // 开始精简字体
  fontmin.run((err, files) => {
    if (err) throw err;
    console.log("compress font success\n");
  });
};
