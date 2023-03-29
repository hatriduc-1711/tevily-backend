import { newsService } from "../services/newsServices.js";

export const newsController = {
  getAllNews: async (req, res) => {
    try {
      const response = await newsService.getAllNews(req.query.page);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getNews: async (req, res) => {
    try {
      const news = await newsService.getNews(req.query.slug);
      return res.status(200).json(news);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
};
