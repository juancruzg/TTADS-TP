var express = require("express");
var controller = require("./task.controller")

var router = express.Router();

router.get("/", controller.getTasks);

router.get("/search", controller.searchTasks);

router.get("/:id", controller.getTasks);

router.put("/", controller.saveTask);

router.post("/", controller.saveTask);

router.delete("/:id", controller.deleteTask);

module.exports = router;
