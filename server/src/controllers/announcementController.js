import Announcement from '../models/Announcement.js';

// GET all announcements (sorted by date desc)
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ date: -1 })
      .populate('createdBy', 'name email'); // optional: get author's info
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching announcements' });
  }
};

// CREATE new announcement (Admin only)
export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, priority, date } = req.body;
    const newAnnouncement = await Announcement.create({
      title,
      content,
      priority: priority || 'low',
      date: date || Date.now(),
      createdBy: req.user._id,
    });
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating announcement' });
  }
};

// DELETE announcement by ID (Admin only)
export const deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Announcement not found' });

    res.json({ message: 'Announcement removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting announcement' });
  }
};

