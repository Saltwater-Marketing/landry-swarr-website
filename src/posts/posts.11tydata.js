export default {
  eleventyComputed: {
    breadcrumbs: (d) => [["Blog", "/blog/"], [d.heading, d.page.url]],
  },
};
