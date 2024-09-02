"use strict";

var express = require("express");

var _require = require("../controller/viewController"),
    getOverview = _require.getOverview,
    getTour = _require.getTour;

var router = express.Router();
router.route("/").get(getOverview);
router.route("/tour").get(getTour); // router.route("/tour/:slug").get(getTour);

module.exports = router;
//# sourceMappingURL=viewRoutes.dev.js.map
