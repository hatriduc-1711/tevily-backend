import { adminServices } from "../services/adminServices.js";

export const adminControllers = {
  getAllAdmins: async (req, res) => {
    try {
      const listAdmins = await adminServices.getListAdmin();
      return res.status(200).json(listAdmins);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const listUsers = await adminServices.getListUsers();
      return res.status(200).json(listUsers);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  getAdmin: async (req, res) => {
    try {
      const admin = await adminServices.getAdmin(req.query._id);
      return res.status(200).json(admin);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  addAdmin: async (req, res) => {
    try {
      const message = await adminServices.addAdmin(req.body);
      return res.status(200).json(message);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const message = await adminServices.updateAdmin(req.body);
      return res.status(200).json(message);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const message = await adminServices.deleteAdmin(req.body._id);
      return res.status(200).json(message);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const message = await adminServices.deleteUser(req.body._id);
      return res.status(200).json(message);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
};
