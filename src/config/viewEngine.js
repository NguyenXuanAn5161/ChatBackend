// cho nodejs hieu duoc dung cong cu viewEngine de viet code html

import express from "express";

/**
 *
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
  /**dinh nghia noi luu tru file */
  app.use(express.static("./src/public"));
  /** dinh nghia cong nghe viet code html voi nodejs */
  app.set("view engine", "ejs");
  /** dinh nghia cac file view se duoc luu o day, giong config trong java luc thi cuoi ky www */
  app.set("views", "./src/views");
};

export default configViewEngine;
