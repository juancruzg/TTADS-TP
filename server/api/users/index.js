var express = require("express");
var controller = require("./user.controller")

var router = express.Router();

router.get("/", controller.getUsers);

router.get("/search", controller.searchUsers);

router.get("/:id", controller.getUsers);

router.put("/", controller.saveUser);

router.post("/", controller.saveUser);

router.delete("/:id", controller.deleteUser);

router.get("/:id/tasks", controller.getTasks);

router.get("/:id/tasks/count", controller.countTasks);

module.exports = router;
