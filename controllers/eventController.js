const Event = require('../models/Event.js');
const jwt = require('jsonwebtoken');
const handleInvalidToken = (res) => {
  return res.status(401).json({ message: 'Invalid token' });
};
exports.renderButton = (req, res) => {
  res.render('users/event.ejs', { user: req.user });
};

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
  console.log("hello");
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return handleInvalidToken(res);
  }
  
  
  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userName= decoded.name
    req.user = decoded;
    console.log(userName);
    const event = new Event({name:userName});
    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { clicked: true }, { new: true });
    if (!event) throw new Error('Event not found');
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    // Use Mongoose to find and remove the event by ID
    const deletedEvent = await Event.findByIdAndRemove(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
