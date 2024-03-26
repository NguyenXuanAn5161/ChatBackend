/**file dieu huong thong thuong se viet o day*/

import express from "express";

const router = express.Router();

/** khoi tao nhung route trong day */
const initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.render("index");
  });

  return app.use("/", router);
};

export default initWebRoutes;
