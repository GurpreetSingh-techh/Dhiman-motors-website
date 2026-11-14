# Dhiman MotoHub

A static sports-bike catalogue and purchase-enquiry demo.

## Run locally
Open `index.html` in a browser, or use VS Code Live Server.

## Deploy with GitHub Pages
1. Create a GitHub repository (for example, `dhiman-motohub`).
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/(root)`, then Save.
6. Wait for GitHub Pages to publish the site.

## Important limitations
This is a front-end demo. Cart and enquiry history are stored in the visitor's browser using localStorage. Submitting an enquiry creates a local reference number and offers an email draft; it does not send an order to the business, send an automatic confirmation email, accept payment, or create a central order record. A confirmation link works only in the same browser where the local order was saved. For real orders and cross-device confirmation/tracking, connect a backend/database and an email service, and integrate a payment provider if online payment is required.

Bike prices and specifications are sample listing data and must be verified before publishing.
