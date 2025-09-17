import Carousel from "../models/carouselModel.js";

export const getCarousel = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From frontend query
    } else {
      return res.status(400).json({
        message: "Admin ID is required",
      });
    }

    const carousel = await Carousel.find({ adminId });
    if (!carousel) {
      return res.status(404).json({
        message: "No carousel found",
      });
    }
    res.status(200).json(carousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCarousel = async (req, res) => {
  try {
    const adminId = req.user._id;
    const existing = await Carousel.findOne({ adminId });

    let savedCarousel;
    if (existing) {
      existing.carousel = req.body.carousel;
      existing.show = req.body.show;
      savedCarousel = await existing.save();
    } else {
      const newCarousel = new Carousel({
        adminId,
        carousel: req.body.carousel,
        show: req.body.show,
      });
      savedCarousel = await newCarousel.save();
    }

    res.status(200).json({ success: true, data: savedCarousel });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
