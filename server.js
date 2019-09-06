const express = require("express");
const server = express();

//global middleware
server.use(express.json());
server.use(logger);

//router
const actionsRouter = require("./actions/actionsRouter");
server.use("/actions", actionsRouter);

const projectRouter = require("./actions/projectsRouter");
server.use("/projects", projectRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Sprint Challenge!</h2>`);
});

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;
