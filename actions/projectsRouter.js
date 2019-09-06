const express = require("express");
const Data = require("../data/helpers/projectModel");
const router = express.Router();

// GET PROJECTS
router.get("/", (req, res) => {
  Data.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log("error in get projects", err);
      res.status(500).json({
        errorMessage: "The projects info could not be retrieved"
      });
    });
});

// GET PROJECTS ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Data.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log("error in get projects", err);
      res.status(500).json({
        errorMessage: "The projects id could not be retrieved"
      });
    });
});

// ADD PROJECT
router.post("/", (req, res) => {
  const projects = req.body;
  console.log("THIS IS A PROJECT", projects);

  Data.insert(projects)
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(err => {
      console.log("error in get projectss", err);
      res.status(500).json({
        errorMessage: "Cannot add projects to the server"
      });
    });
});

// UPDATE PROJECT
router.put("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  const newProject = req.body;

  Data.update(id, newProject)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Something wrong with the server" });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.project;
  Data.remove(id)
    .then(res.status(204).end())
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Cannot delete, can't find ID on the server" });
    });
});

// MIDDLEWARE
function validateProjectId(req, res, next) {
  const { id } = req.params;
  Data.get(id).then(project => {
    if (project) {
      req.project = project;
      next();
    } else {
      res
        .status(500)
        .json({ project: "Project ID does not exist in the server" });
    }
  });
}

module.exports = router;
