const Event = require('../models/Event.js');
const jwt = require('jsonwebtoken');
const handleInvalidToken = (res) => {
  return res.status(401).json({ message: 'Invalid token' });
};
// exports.renderButton = (req, res) => {
//   res.render('users/event.ejs', { user: req.user });
// };

exports.getAllEvents = async (req, res, next) => {
  try {
    const userName = req.user;
    const events = await Event.find({ user: userName });
    res.status(200).json({ message: 'All events fetched successfully', events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) throw new Error('Event not found');
    res.status(200).json({ message: 'Event fetched successfully', event });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully', event: deletedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateEvent= async (req,res,next)=>{
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
