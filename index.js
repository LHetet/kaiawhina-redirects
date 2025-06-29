const express = require("express");
const redirects = require("./public/kaiawhina-redirects.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/:ref", (req, res) => {
  const ref = req.params.ref.toLowerCase();

  const match = redirects.kaiawhina.find(k =>
    k.name.toLowerCase().replace(/\s+/g, '') === ref
  );
console.log(ref, match);

  if (match) {
    return res.redirect(301, match.referral);
  } else {
    return res.status(404).send("Kaiawhina not found");
  }
});

app.listen(PORT, () => {
  console.log(`Redirect server running on port ${PORT}`);
});
