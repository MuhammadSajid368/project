import { Event } from "../models/Events.js";

export const eventDetails = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404).json({
      success: false,
      message: "Event not Found!!",
    });
  }
  res.status(200).json({
    success: true,
    event,
  });
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const createEvent =

export const upcomingEvents = async (req, res) => {
  try {
    const upcomingEvents = await Event.find({ status: "upcoming" });

    res.json(upcomingEvents);
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEventStatus = async (req, res) => {
  try {
    const { eventId, status } = req.body;
    const event = await Event.findByIdAndUpdate(
      eventId,
      { status },
      { new: true }
    );
    if (!leave) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
