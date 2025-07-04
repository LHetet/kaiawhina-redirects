const express = require("express");
const fs = require("fs");
const app = express();

// Load flat key-value JSON
const redirectMap = JSON.parse(fs.readFileSync("./public/kaiawhina-redirects.json", "utf8"));

app.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  const redirectUrl = redirectMap[slug];

  if (redirectUrl) {
    console.log(`✅ Redirecting /${slug} to ${redirectUrl}`);
    res.redirect(redirectUrl);
  } else {
    console.log(`❌ Not found: /${slug}`);
    res.status(404).send("Not found");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Redirect server running on port ${PORT}`);
});

