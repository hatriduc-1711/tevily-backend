import mongoose from "mongoose";
import { Admin } from "../model/Admins.js";
import { User } from "../model/Users.js";
import { checkEmail, hashPassword, checkTitle } from "./services.js";

const Admins = mongoose.model("Admin", Admin);
const Users = mongoose.model("User", User);

export const adminServices = {
  getListAdmin: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listAdmin = await Admins.find();
        resolve(listAdmin);
      } catch (err) {
        reject(err);
      }
    });
  },

  getListUsers: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listUsers = await Users.find();
        resolve(listUsers);
      } catch (err) {
        reject(err);
      }
    });
  },

  getAdmin: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const admin = await Admins.findById(id);
        resolve(admin);
      } catch (err) {
        reject(err);
      }
    });
  },

  addAdmin: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const check = await checkEmail(data.email);
        if (check) {
          resolve({
            code: 1,
            message: "Account already exists ! ! !",
          });
        } else {
          const newPassword = await hashPassword(data.password);
          await Admins.create({
            email: data.email,
            name: data.name,
            password: newPassword,
            image:
              "https://img5.thuthuatphanmem.vn/uploads/2021/11/08/gau-truc-chibi-dep-nhat_082044963.jpg",
            role: "admin",
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

  updateAdmin: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const admin = await Admins.findOne({ _id: data.id });
        if (admin.email === data.email) {
          admin.name = data.name;
          admin.save();
          resolve({
            code: 0,
            message: "Updated successfully ! ! !",
          });
        } else {
          const check = await checkEmail(data.email);
          if (check) {
            resolve({
              code: 1,
              message: "Account already exists ! ! !",
            });
          } else {
            admin.name = data.name;
            admin.email = data.email;
            admin.save();
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

  deleteAdmin: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Admins.findOneAndDelete({ _id: id });
        resolve({
          code: 0,
          message: "Deleted successfully ! ! !",
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  deleteUser: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Users.findOneAndDelete({ _id: id });
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
