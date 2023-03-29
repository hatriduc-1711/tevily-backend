import { destinationService } from "../services/destinationServices.js";

export const destinationControllers = {
  getAllDestinations: async (req, res) => {
    try {
      const response = await destinationService.getAllDestinations();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getDestination: async (req, res) => {
    try {
      const response = await destinationService.getDestination(req.query.slug);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  createDestinations: async (req, res) => {
    try {
      const response = await destinationService.createDestinations(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
