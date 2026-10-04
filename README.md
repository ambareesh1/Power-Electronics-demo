# Power Electronics demo

Complete responsive electronics ecommerce prototype with the white, charcoal and coral theme, bundled product photos, customer and admin demo accounts, and an Excel-to-catalog review workflow.

## Deploy on Vercel

Import `ambareesh1/Power-Electronics-demo` as a new Vercel project. Keep the root directory at the repository root. `vercel.json` configures:

- Framework preset: **Other**
- Build command: **npm run build**
- Output directory: **dist**
- Environment variables: **none**

The build validates the static files; no compilation or external runtime dependencies are required. Product photos, the Excel parser and sample templates are bundled. Share links automatically use the current deployment URL. The app uses hash routes, so product and admin links work without server rewrites.

## Run locally

Requires Node.js 22 or newer.

```sh
npm install
npm run build
npm start
```

Open http://localhost:3000. `npm run dev` starts the same local static server.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Customer | customer@powerelectronics.demo | Customer123! |
| Admin | admin@powerelectronics.demo | Admin123! |

The top bar links to separate customer and administrator login pages. Each screen has a **Fill demo credentials** button. Login is a browser simulation, not production authentication.

## Included features

- Search, category/price/availability filters and sorting.
- Product details and specifications, wishlist, and sharing via WhatsApp, Facebook, LinkedIn, Telegram, copy link and the native device share sheet where supported.
- Product cards show **Add to cart** at zero quantity and **minus / quantity / plus** after adding.
- Cart, BUILD10 discount, sample checkout, confirmation, inventory updates and customer order history.
- Admin overview, products, inventory, order-status editing and customer summaries.
- **Upload Excel**: XLSX, XLS and CSV files up to 5 MB and 250 products per batch.
- Downloadable Excel/CSV templates and **Try sample products**.
- **Uploaded items**: validation errors, duplicate SKUs, image matching, editable drafts, batch filters and explicit publish confirmation.
- Editing a published import creates pending changes; republishing updates the existing product.

## Import workflow

1. Sign in as admin and open **Upload Excel**.
2. Download the template, or choose **Try sample products**.
3. Upload a sheet with SKU, Title, Description, Category, Price and Stock. CompareAtPrice and ImageURL are optional.
4. Review drafts in **Uploaded items**. Fix invalid rows and check each product image.
5. Publish selected or ready items. They become visible in the same browser's demo storefront.

Images automatically match against the included reference catalog. Unknown products require a manually selected reference photo or a direct public HTTPS ImageURL. This demo does not perform live internet image search. External URLs are checked by the browser and may be blocked by the image host.

## Data and production boundary

Cart, wishlist, orders, profile, import batches and catalog edits are stored in localStorage in the current browser. Demo login is in sessionStorage. Data is not shared between devices or visitors. No real payments, emails, notifications or shipments occur. All prices, stock, ratings, orders and policies are sample content. Imported products do not receive fabricated reviews.

A real launch requires server-side authentication and authorization, a shared database, upload storage, verified product data, approved image usage, payment and delivery integrations, tax settings and legal policies. The public demo credentials must not be used as real account credentials.

## Files

`dist/index.html`, `dist/style.css` and `dist/app.js` contain the interface and logic. `dist/assets/` contains 14 product images. `dist/samples/` contains the Excel and CSV templates. `dist/vendor/` contains SheetJS CE 0.20.3 and its license. `asset-sources.json` records the photo sources.

Photos were retrieved from the user-specified Vishal Electronics reference catalog for client demonstration. Commercial reuse permission has not been verified. SheetJS is vendored from its official CDN and distributed under Apache 2.0.

## Validation

`npm run build` verifies JavaScript syntax, required files, local asset references and static Vercel settings. During authoring, simulated UI/state checks covered shopping, separate demo logins, card quantities, sharing, real XLSX import, validation, automatic image matches, draft isolation, publishing and republishing. The sample workbook was rendered and visually reviewed. Full live-browser visual QA and a real Vercel deployment have not been performed.
