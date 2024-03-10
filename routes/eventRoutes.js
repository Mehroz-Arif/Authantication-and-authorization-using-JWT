const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const Event = require('../models/Event.js');
const { verifyToken} = require('../middlewares.js');

router.route("/")
  .get(eventController.renderButton)
  .post(verifyToken,eventController.createEvent);

// router.route('/:id')
//   .get(eventController.getEventById)
//   .put(eventController.updateEvent);

router.get('/show', eventController.getAllEvents);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
