import mongoose from "mongoose";
import { Tour } from "../model/Tours.js";
import { checkTitle } from "./services.js";

const Tours = mongoose.model("Tour", Tour);

export const toursService = {
  getAllTours: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listTours = await Tours.find();
        resolve(listTours);
      } catch (err) {
        reject(err);
      }
    });
  },

  getAllToursClient: (page) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (page) {
          const totalDocuments = await Tours.countDocuments();
          let pageInt = parseInt(page);
          const pageSize = 6;
          const totalPages = Math.ceil(totalDocuments / pageSize);

          if (pageInt <= 1) pageInt = 1;

          const listTours = await Tours.find({})
            .skip((pageInt - 1) * pageSize)
            .limit(pageSize);
          resolve({
            totalPages: totalPages,
            listTours: listTours,
          });
        } else {
          const listTours = await Tours.find({});
          resolve(listTours);
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  getTourSearch: (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tourSearch = await Tours.find(params);
        resolve(tourSearch);
      } catch (err) {
        reject(err);
      }
    });
  },

  getTours: (slug) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tour = await Tours.findOne({ slug: slug });
        resolve(tour);
      } catch (err) {
        reject(err);
      }
    });
  },

  addTour: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const check = await checkTitle(data.title);
        if (check) {
          resolve({
            code: 1,
            message: "This tour already exists ! ! !",
          });
        } else {
          await Tours.create({
            title: data.title,
            price: data.price,
            address: data.address,
            image: data.image,
            duration: data.duration,
            destination: data.destination,
            activityType: data.activityType,
            scores: 0,
          });
          resolve({
            code: 0,
            message: "Successful new creation ! ! !",
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  updateTour: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tour = await Tours.findOne({ _id: data.id });
        if (tour.title === data.title) {
          tour.price = data.price;
          tour.address = data.address;
          tour.duration = data.duration;
          tour.destination = data.destination;
          tour.activityType = data.activityType;
          tour.save();
          resolve({
            code: 0,
            message: "Updated successfully ! ! !",
          });
        } else {
          const check = await checkTitle(data.title);
          if (check) {
            resolve({
              code: 1,
              message: "This tour already exists ! ! !",
            });
          } else {
            tour.title = data.title;
            tour.price = data.price;
            tour.address = data.address;
            tour.duration = data.duration;
            tour.destination = data.destination;
            tour.activityType = data.activityType;
            tour.save();
            resolve({
              code: 0,
              message: "Updated successfully ! ! !",
            });
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  deleteTour: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Tours.findOneAndDelete({ _id: id });
        resolve({
          code: 0,
          message: "Deleted successfully ! ! !",
        });
      } catch (err) {
        reject(err);
      }
    });
  },
};
