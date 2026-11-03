# Landry & Swarr website

The static rebuild of www.landryswarr.com (it replaces the old WordPress/Avada site). It's built with [Eleventy](https://www.11ty.dev/) and hosted on Netlify. When something is pushed to `main`, Netlify rebuilds and publishes the site automatically.

## Where things live

| What | File |
|---|---|
| Phone, address, email, GTM / Meta Pixel IDs, GHL form ID, responsible attorney | `src/_data/site.json` |
| Main menu, sidebar link groups, blog category names | `src/_data/nav.json` |
| Home page | `src/index.njk` |
| Contact page | `src/contact-us.njk` |
| All other pages (practice areas, resources, verdicts, firm) | `src/pages/**.html`, one file per page (the `permalink` line holds the URL) |
| Blog posts | `src/posts/*.html`, one file per post |
| Header, footer, tracking, SEO tags, schema | `src/_includes/base.njk`, `src/_includes/schema.njk` |
| Interior page layout (hero, sidebar, CTA, form) | `src/_includes/page.njk` |
| Blog post layout | `src/_includes/post.njk` |
| Case review form (GoHighLevel embed) | `src/_includes/ghl-form.njk` (main form `ghl.formId`; ebook page uses `ghl.ebookFormId`) |
| Styles | `src/assets/css/site.css` |
| Images | `src/images/` (WebP) |
| PDFs | `src/files/` |
| Redirects and headers | `netlify.toml` |

## Common updates

- **New blog post:** copy any file in `src/posts/`, then change the front matter (`title`, `description`, `heading`, `date`, `image`, `permalink`, `tags`) and the body. Add `"talc"`, `"benzene"`, `"mesothelioma"`, etc. to `tags` so the post shows up on the matching practice pages and category pages.
- **Change the form:** set `ghl.formId` in `src/_data/site.json`. Every form on the site uses that ID.
- **Rename a page's URL:** change its `permalink`, then add a 301 redirect from the old URL in `netlify.toml`.
- **Retire a page:** delete the file and add a 301 redirect to the closest related page in `netlify.toml`.

## Run locally

```bash
npm install
```

```bash
npm start
```

Then open http://localhost:8080. To produce the publishable `_site/` folder instead, run `npm run build`.

## SEO notes

- Every old WordPress URL either still exists at the same address or 301-redirects to the closest page (see `netlify.toml`).
- `/asbestosis/` moved to `/asbestos-lawyer/`.
- Duplicate and off-topic posts were merged or retired with 301s.
- Titles and meta descriptions were carried over from All in One SEO.
- `sitemap.xml` and `robots.txt` are generated on every build.
