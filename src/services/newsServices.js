import mongoose from "mongoose";
import { News } from "../model/News.js";

const NewsModel = mongoose.model("News", News);

export const newsService = {
  getAllNews: (page) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (page) {
          const totalDocuments = await NewsModel.countDocuments();
          let pageInt = parseInt(page);
          const pageSize = 6;
          const totalPages = Math.ceil(totalDocuments / pageSize);

          if (pageInt <= 1) pageInt = 1;

          const listNews = await NewsModel.find({})
            .skip((pageInt - 1) * pageSize)
            .limit(pageSize);
          resolve({
            totalPages: totalPages,
            listNews: listNews,
          });
        } else {
          const listNews = await NewsModel.find({});
          resolve(listNews);
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  getNews: (slug) => {
    return new Promise(async (resolve, reject) => {
      try {
        const news = await NewsModel.findOne({ slug: slug });
        resolve(news);
      } catch (err) {
        reject(err);
      }
    });
  },
};
