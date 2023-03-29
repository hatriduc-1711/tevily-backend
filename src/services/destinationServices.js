import mongoose from "mongoose";
import { Destination } from "../model/Destination.js";
import { Tour } from "../model/Tours.js";

const Destinations = mongoose.model("Destination", Destination);
const Tours = mongoose.model("Tour", Tour);

export const destinationService = {
  getAllDestinations: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listDestinations = await Destinations.find();
        resolve(listDestinations);
      } catch (err) {
        reject(err);
      }
    });
  },

  getDestination: (slug) => {
    return new Promise(async (resolve, reject) => {
      try {
        const news = await Destinations.findOne({ slug: slug });
        resolve(news);
      } catch (err) {
        reject(err);
      }
    });
  },

  createDestinations: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tours = await Tours.find({ destination: data.name });
        const destination = await Destinations.create({
          name: data.name,
          subtitle: data.subtitle,
          image: data.image,
          column: true,
          column1: true,
          column4: data.column4,
          column2: data.column2,
          tours: tours,
          tourNumber: data.tourNumber,
        });
        resolve(destination);
      } catch (err) {
        reject(err);
      }
    });
  },
};
