const SECTION = {
  practice: ["Practice Areas", "/areas-of-practice/"],
  talc: ["Practice Areas", "/areas-of-practice/"],
  meso: ["Mesothelioma Guide", "/meso-general-info/"],
  asbestos: ["Asbestos Info", "/asbestos-info/"],
  benzene: ["Benzene Exposure", "/benzene-law/"],
  results: ["Results", "/verdicts/"],
  firm: ["Our Firm", "/our-firm/"],
  legal: null,
};
const TAG_BY_URL = [
  [/talc/, "talc"], [/benzene/, "benzene"], [/lung-cancer/, "lung-cancer"], [/genetic/, "genetics"],
  [/verdict|case-decisions|testimonials/, "verdicts"], [/family|secondary/, "asbestos"],
];
const TAG_BY_SECTION = { meso: "mesothelioma", asbestos: "asbestos", benzene: "benzene", results: "verdicts", firm: "mesothelioma", practice: "mesothelioma" };

export default {
  eleventyComputed: {
    breadcrumbs: (d) => {
      const s = SECTION[d.section];
      const crumbs = [];
      if (s && s[1] !== d.page.url) crumbs.push(s);
      crumbs.push([d.navLabel || d.heading, d.page.url]);
      return crumbs;
    },
    postTag: (d) => {
      if (d.postTag) return d.postTag;
      for (const [re, t] of TAG_BY_URL) if (re.test(d.page.url)) return t;
      return TAG_BY_SECTION[d.section] || "mesothelioma";
    },
  },
};
