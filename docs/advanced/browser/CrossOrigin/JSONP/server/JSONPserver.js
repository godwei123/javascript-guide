const express = require("express");

//JSONP
const webapp = express();
webapp.get("/", (req, res) => {
  const fn = req.query.callback;
  res.send(fn + '("chaos")');
});
webapp.listen(90);
