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
    // Get page number from query parameter or default to 1
    const page = parseInt(req.query.page) || 1;

    // Get limit from query parameter or default to 10
    const limit = parseInt(req.query.limit) || 10;

    // Calculate skip value
    const skip = (page - 1) * limit;

    // Fetch events without filtering by user
    const events = await Event.find()
      .skip(skip)
      .limit(limit)
      .exec();

    const totalEvents = await Event.countDocuments(); // Count total events

    const totalPages = Math.ceil(totalEvents / limit); // Calculate total pages

    // Prepare pagination metadata
    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalEvents: totalEvents,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    res.status(200).json({ message: 'All events fetched successfully', events, pagination });
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
exports.updateEvent = async (req, res, next) => {
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
