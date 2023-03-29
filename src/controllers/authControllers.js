import { authServices } from "../services/authServices.js";

export const authController = {
  handleRegister: async (req, res) => {
    try {
      let message = await authServices.register(req.body);
      return res.status(200).json(message);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  handleLogin: async (req, res) => {
    try {
      let message = await authServices.login(req.body, res);
      return res.status(200).json(message);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.headers.cookie.split("=");
      let message = await authServices.refreshToken(refreshToken[1], res);
      return res.status(200).json(message);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  logout: async (req, res) => {
    try {
      const refreshToken = req.headers.cookie.split("=");
      let message = await authServices.logout(refreshToken[1], res);
      return res.status(200).json(message);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
