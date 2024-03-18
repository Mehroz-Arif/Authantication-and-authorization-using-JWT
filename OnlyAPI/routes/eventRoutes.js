const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const {verifyToken} = require('../middlewares.js');
const Event = require('../models/Event.js');

router.get('/show', eventController.getAllEvents);
router.route("/")
  
  .post(verifyToken,eventController.createEvent);

router.route('/:id')
  .get(eventController.getEventById)
  .put(eventController.updateEvent)
  .delete( eventController.deleteEvent);



module.exports = router;
