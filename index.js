const express = require("express");
const app = express();
const path = require("path");
const redirects = require("./public/kaiawhina-redirects.json"); // ✅ this is key

const PORT = process.env.PORT || 3000;

app.get("/:slug", (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const kaiawhina = redirects.kaiawhina.find(k => k.slug === slug);

  if (kaiawhina) {
    res.redirect(kaiawhina.referral);
  } else {
    res.status(404).send("Referral not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
