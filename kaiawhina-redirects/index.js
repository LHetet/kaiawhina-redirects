const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ Load Kaiawhina redirects
const kaiawhinaRedirects = JSON.parse(
  fs.readFileSync(path.join(__dirname, "public", "kaiawhina-redirects.json"), "utf8")
);

// ✅ Load Product redirects
const productRedirects = JSON.parse(
  fs.readFileSync(path.join(__dirname, "public", "product-redirects.json"), "utf8")
);

// ✅ Log unmatched slugs
const logUnmatched = (url) => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] Not found: ${url}\n`;
  fs.appendFile(path.join(__dirname, "logs", "unmatched.log"), logLine, err => {
    if (err) console.error("❌ Error writing to log:", err);
  });
};

// ✅ Primary Kaiawhina redirect: e.g. /sophiesosj7w
app.get("/:slug", (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  const redirectUrl = kaiawhinaRedirects[slug];
  if (redirectUrl) {
    console.log(`✅ Redirecting /${slug} to ${redirectUrl}`);
    res.redirect(redirectUrl);
  } else {
    next();
  }
});

// ✅ Product redirect: e.g. /thank-you/MOD1
app.get("/thank-you/:productSlug", (req, res, next) => {
  const slug = req.params.productSlug.toUpperCase();
  const redirectUrl = productRedirects[slug];
  if (redirectUrl) {
    console.log(`✅ Redirecting /thank-you/${slug} to ${redirectUrl}`);
    res.redirect(redirectUrl);
  } else {
    next();
  }
});

// ❌ 404 fallback with logging
app.use((req, res) => {
  logUnmatched(req.originalUrl);
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Redirect server running on port ${PORT}`);
});
