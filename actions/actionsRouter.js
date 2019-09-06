const express = require("express");
const Data = require("../data/helpers/actionModel");
const router = express.Router();

// GET ACTIONS
router.get("/", (req, res) => {
  Data.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log("error in get actions", err);
      res.status(500).json({
        errorMessage: "The actions info could not be retrieved"
      });
    });
});

// GET ACTION ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Data.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log("error in get actions", err);
      res.status(500).json({
        errorMessage: "The actions id could not be retrieved"
      });
    });
});

// ADD ACTION
router.post("/", (req, res) => {
  const action = req.body;

  Data.insert(action)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log("error in get actions", err);
      res.status(500).json({
        errorMessage: "Cannot add action to the server"
      });
    });
});

// UPDATE ACTION
router.put("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  const newAction = req.body;

  Data.update(id, newAction)
    .then(action => {
      // console.log("test the action", action);
      res.status(200).json(action);
    })
    .catch(err => {
      // console.log("error in updating action", err);
      res.status(500).json(
        {
          errorMessage: "Something wrong with the server"
        },
        err
      );
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.action;
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
function validateActionId(req, res, next) {
  const { id } = req.params;
  Data.get(id).then(action => {
    if (action) {
      req.action = action;
      next();
    } else {
      res
        .status(500)
        .json({ action: "Action ID does not exist in the server" });
    }
  });
}

module.exports = router;
