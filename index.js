const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ Load Kaiawhina and Product Redirects
const kaiawhinaRedirects = JSON.parse(
  fs.readFileSync(path.join(__dirname, "kaiawhina-redirects", "public", "kaiawhina-redirects.json"), "utf8")
);
const productRedirects = JSON.parse(
  fs.readFileSync(path.join(__dirname, "kaiawhina-redirects", "public", "product-redirects.json"), "utf8")
);

// ✅ Logging unmatched slugs
const logUnmatched = (url) => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] Not found: ${url}\n`;
  fs.appendFile(path.join(__dirname, "logs", "unmatched.log"), logLine, err => {
    if (err) console.error("❌ Error writing log:", err);
  });
};

// ✅ Kaiawhina redirect
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

// ✅ Product redirect
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

// ❌ 404 fallback
app.use((req, res) => {
  logUnmatched(req.originalUrl);
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// ✅ Dynamic PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Redirect server running on port ${PORT}`);
});

