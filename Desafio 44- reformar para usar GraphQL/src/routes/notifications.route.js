const express = require("express");
const { Router } = express;
const router = Router();
const controller = require('../controllers/notifications.controller')


router.post('/:orderId', controller.updateOrder)


module.exports = router