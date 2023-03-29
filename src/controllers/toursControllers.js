import { toursService } from "../services/toursServices.js";

export const toursController = {
  getAllTours: async (req, res) => {
    try {
      const listTours = await toursService.getAllTours();
      return res.status(200).json(listTours);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  getAllToursClient: async (req, res) => {
    try {
      const response = await toursService.getAllToursClient(req.query.page);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getTourSearch: async (req, res) => {
    try {
      const response = await toursService.getTourSearch(req.query);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getTours: async (req, res) => {
    try {
      const tour = await toursService.getTours(req.query.slug);
      return res.status(200).json(tour);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  addTour: async (req, res) => {
    try {
      const message = await toursService.addTour(req.body);
      return res.status(200).json(message);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  updateTour: async (req, res) => {
    try {
      const message = await toursService.updateTour(req.body);
      return res.status(200).json(message);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  deleteTour: async (req, res) => {
    try {
      const message = await toursService.deleteTour(req.body._id);
      return res.status(200).json(message);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
};
