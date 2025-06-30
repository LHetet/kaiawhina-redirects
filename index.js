const express = require("express");
const redirectMap = require("./kaiawhina-redirects.json");

const app = express();

app.get("/:referralCode", (req, res) => {
  const referralCode = req.params.referralCode;
  const redirectUrl = redirectMap[referralCode];

  if (redirectUrl) {
    console.log(`Redirecting ${referralCode} → ${redirectUrl}`);
    res.redirect(302, `${redirectUrl}?ref=${referralCode}`);
  } else {
    res.status(404).send("Referral not found");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Redirect server running on port ${PORT}`);
});
