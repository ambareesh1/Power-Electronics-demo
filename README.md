# Power Electronics demo

Complete responsive electronics ecommerce prototype with the white, charcoal and coral theme, bundled product photos, customer and admin demo accounts, an Excel-to-catalog review workflow, institutional bulk quotation requests, and catalog pricing controls.

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
- **Settings**: email/SMS preferences, sender/admin contact fields, communication preview log, and enabled UPI/card/COD methods with configurable fixed and percentage charges.
- **Catalog editor**: title, SKU, category, description, price, compare-at price, stock, specifications, active/inactive visibility, HTTPS image URL, reference photo or replacement PNG/JPEG/WebP upload (500 KB maximum). Inactive products are hidden from the storefront and removed from active carts.
- **Price versions**: searchable, expandable product tree grid with initial recorded price and every subsequent price change.
- **Quotation assistant**: matched-component line totals and a suggested bulk quotation, with manual matching for unknown or ambiguous items and an explicit Add amount action.
- Customer **Bulk orders**: contact and institution details, required shipping address and optional alternate phone, downloadable Item/Count templates, XLSX/CSV validation, preview, and request tracking.
- Role-specific **Notifications**: unread bell counts, All/Unread filters, mark-as-read and detail links for new bulk requests, status updates, catalog price changes and stock availability. Notifications persist locally and sync across tabs on the same origin.
- **Stock requests**: customer availability requests from out-of-stock products, admin review/status/notes, duplicate-request protection and automatic customer updates when an item is restocked.
- Admin **Bulk orders**: full contact/shipping cards, customer lists, quote total, delivery reference, customer-visible notes, and Submitted → Quoted → Delivered → Completed timeline.
- **Pricing & stock**: all-product, category, or selected-product adjustments by percentage (e.g. 0.5%) or INR (e.g. ₹25), before/after previews, selected stock updates, and out-of-stock actions.
- **Price history**: individual edits, bulk changes, and Excel republication audit records, with actor, timestamp, reason, before/after amounts and CSV export.
- **Upload Excel**: XLSX, XLS and CSV files up to 5 MB and 250 products per batch.
- Downloadable Excel/CSV templates and **Try sample products**.
- **Uploaded items**: validation errors, duplicate SKUs, image matching, editable drafts, batch filters, downloadable issue reports and explicit publish confirmation.
- Editing a published import creates pending changes; republishing updates the existing product.

## Import workflow

1. Sign in as admin and open **Upload Excel**.
2. Download the template, or choose **Try sample products**.
3. Upload a sheet with SKU, Title, Description, Category, Price and Stock. CompareAtPrice and ImageURL are optional.
4. Choose the worksheet, map source columns, and validate the row preview before creating drafts. Required fields cannot be skipped or mapped to duplicate columns.
5. Review drafts in **Uploaded items**. Fix invalid rows and check each product image.
6. Publish selected or ready items. They become visible in the same browser's demo storefront.

Images automatically match against the included reference catalog. Unknown products require a manually selected reference photo or a direct public HTTPS ImageURL. This demo does not perform live internet image search. External URLs are checked by the browser and may be blocked by the image host.

## Data and production boundary

Cart, wishlist, orders, bulk requests, stock requests, notifications, price history, profile, import batches and catalog edits are stored in localStorage in the current browser. Demo login is in sessionStorage. Data is not shared between devices or visitors. No real payments, emails, notifications or shipments occur. All prices, stock, ratings, orders and policies are sample content. Imported products do not receive fabricated reviews.

A real launch requires server-side authentication and authorization, a shared database, upload storage, verified product data, approved image usage, payment and delivery integrations, tax settings and legal policies. The public demo credentials must not be used as real account credentials.

## Files

`dist/index.html`, `dist/style.css`, `dist/app.js`, `dist/operations.js` and `dist/customer-experience.js` and `dist/admin-features.js` contain the interface and logic. `dist/assets/` contains 14 product images. `dist/samples/` contains the Excel and CSV templates. `dist/vendor/` contains SheetJS CE 0.20.3 and its license. `asset-sources.json` records the photo sources.

Photos were retrieved from the user-specified Vishal Electronics reference catalog for client demonstration. Commercial reuse permission has not been verified. SheetJS is vendored from its official CDN and distributed under Apache 2.0.

## Validation

`npm run build` verifies JavaScript syntax, required files, local asset references and static Vercel settings. During authoring, simulated UI/state checks covered shopping, separate demo logins, card quantities, sharing, real XLSX import, validation, automatic image matches, draft isolation, publishing and republishing. The sample workbook was rendered and visually reviewed. `npm test` covers actual XLSX customer/product templates, bulk-request validation and stage transitions, 0.5% and category ₹25 price changes, stock/cart sync, individual and Excel price history, storage rollback, authorization guards and persistence. Live-browser visual QA could not run in this environment because Chromium was unavailable and its download failed. A real Vercel deployment has not been performed.

## Bulk order demonstration

Sign in as customer, open **Bulk orders**, download the sample, fill Item and Count, upload it and enter name, email, primary phone, optional alternate phone, institution type/name and the shipping address, city, state and six-digit Indian PIN code. A landmark is optional. Review the parsed list and submit. In the same browser, switch to the admin account and open **Bulk orders**. Issue a positive quote, then advance one stage at a time to Quoted, Delivered and Completed. The customer sees the quote, notes and timeline after switching back. Completed requests are closed. The admin receives an in-app notification on submission; customers receive an in-app notification on each changed status or quotation. No emails, SMS or external push messages are sent.

## Price controls

Open **Pricing & stock** as admin. Choose all products, the current category or selected products, then select percentage/fixed adjustment, increase/decrease, amount and reason. Preview every changed price and confirm. Prices round to two decimals and must remain within ₹0.01–₹10,00,000. Compare-at prices are raised only when required. Previously placed order totals and bulk quotes retain their values. Select products to mark them out of stock or set an explicit quantity; affected cart quantities are reduced to available inventory. **Price history** records changes made after this feature was introduced.

## Optional Google address lookup

Manual address entry works without configuration. To enable optional Google Places search, add a browser-restricted Maps key to `googleMapsApiKey` in `dist/config.js`, with Maps JavaScript API and Places API (New) enabled in the Google Cloud project. Restrict the key to approved deployment HTTP referrers and the required APIs; never put server secrets in this file. The integration uses `PlaceAutocompleteElement`, requests address components and the formatted address after selection, and fills the editable shipping fields. Customers still need to confirm the building/department and PIN code. Load failures keep manual entry available. Google calls are made only when the customer chooses Search address. The live integration needs a valid key and has not been tested against Google in this demo. Reference: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform

## Notifications and availability demo

Submit a bulk request as customer, then switch to the admin account in the same browser. Open the bell inbox to see the new request and its full details. Change the quote/status; switch back to customer to see the update. From an out-of-stock product, choose **Request availability**, enter contact details and quantity, then submit. Admin can review requests under **Stock requests** and add customer-visible notes. Restocking a product automatically marks open requests Available and creates customer notifications; actual purchasing still depends on current inventory. Single-product and selected-product out-of-stock actions are available. Product cards/details show the most recent price update, and cart/checkout flag changed catalog prices. Notifications are in-app only and do not reach another device or a signed-out user outside this browser. Production notification delivery requires a shared backend and configured messaging services.

## Settings demonstration

Admin **Settings** controls email and SMS preview preferences, sender/reply-to details and the admin recipient. Enabled communication channels produce entries in the communication preview log when request notifications occur; they do not call email or SMS providers. Configure actual provider credentials on a server for production delivery, never in browser storage.

UPI, Card and Cash on delivery can be enabled or disabled independently; at least one must remain enabled. Each method supports a fixed INR charge plus a percentage of the item subtotal after coupon discount, excluding delivery. The fee appears in checkout, follows the selected method and is stored with the resulting demo order. Existing order totals retain their original amounts. No real card details are requested and no payments are collected.

## Catalog visibility and price versions

Use **Edit** on any admin product to change its full catalog details, image and visibility. Deactivating preserves its admin/order records but removes it from customer listings, direct product pages and active carts. Select **Price versions** or open **Price history** to expand product rows and inspect each recorded version. Search by name, SKU, category, reason, admin or price value. History begins when price tracking was introduced; earlier unknown edits cannot be reconstructed.

In **Bulk price adjustment**, choose **Mark out of stock** as the adjustment type, select all/category/selected scope, add a reason, preview the products and save. Prices remain unchanged and availability requests remain available.

## Suggested bulk quotations

Open an incomplete bulk request as admin. The quotation assistant matches requested names or SKUs to active catalog products and computes unit price × count for each row. Unknown or ambiguous matches require a manual product choice. A complete matched total enables **Add quotation**, which fills the quotation field without saving or changing status. Review availability, delivery and other charges, then save the request update to notify the customer. Suggestions exclude delivery and payment charges.
