export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/files": "files" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const toDate = (d) => (d instanceof Date ? d : new Date(d));
  eleventyConfig.addFilter("readableDate", (d) => {
    const x = toDate(d);
    return `${months[x.getUTCMonth()]} ${x.getUTCDate()}, ${x.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("isoDate", (d) => toDate(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("absUrl", (path, base) => new URL(path || "/", base).href);
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("startsWith", (s, p) => String(s || "").startsWith(p));
  eleventyConfig.addFilter("byUrls", (items, urls) =>
    (urls || []).map((u) => items.find((i) => i.url === u)).filter(Boolean)
  );
  // posts sharing a tag with the current one, newest first
  eleventyConfig.addFilter("relatedPosts", (posts, tags, url, n = 3) => {
    const t = (tags || []).filter((x) => x !== "post" && x !== "uncategorized");
    const scored = posts
      .filter((p) => p.url !== url)
      .map((p) => ({ p, s: (p.data.tags || []).filter((x) => t.includes(x)).length }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || b.p.date - a.p.date);
    return scored.slice(0, n).map((x) => x.p);
  });
  eleventyConfig.addFilter("taggedPosts", (posts, tag) => posts.filter((p) => (p.data.tags || []).includes(tag)));

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByTag("post").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("pagesAll", (api) =>
    api.getAll().filter((p) => p.data.layout === "page.njk")
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "html", "md", "11ty.js"],
  };
}
