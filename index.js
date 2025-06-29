const express = require("express");
const redirects = require("./public/kaiawhina-redirects.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/:ref", (req, res) => {
  const ref = req.params.ref.toLowerCase();

  if (redirects[ref]) {
    return res.redirect(301, redirects[ref]);
  } else {
    return res.status(404).send("Not found");
  }
});

app.listen(PORT, () => {
  console.log(`Redirect server running on port ${PORT}`);
});
