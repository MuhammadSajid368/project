const express = require("express")
const filterRouter = express.Router()

filterRouter.route("/filter/course").get(filterCourses)

module.exports = filterRouter