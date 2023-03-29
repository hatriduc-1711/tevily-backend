import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/Users.js";
import { Admin } from "../model/Admins.js";
import { checkEmail, hashPassword } from "./services.js";

const Users = mongoose.model("User", User);
const Admins = mongoose.model("Admin", Admin);

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
    },
    process.env.ACCESS_KEY_SECRET,
    { expiresIn: "30s" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
    },
    process.env.REFRESH_KEY_SECRET,
    { expiresIn: "365d" }
  );
};

let refreshTokens = [];

export const authServices = {
  register: (data) => {
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
          await Users.create({
            email: data.email,
            name: data.name,
            password: newPassword,
            image:
              "https://img5.thuthuatphanmem.vn/uploads/2021/11/08/gau-truc-chibi-dep-nhat_082044963.jpg",
            role: "user",
          });
          resolve({
            code: 0,
            message: "Successful new creation ! ! !",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },

  login: (data, response) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await Users.findOne({ email: data.email });
        const admin = await Admins.findOne({ email: data.email });
        if (user) {
          const validPasswordUser = await bcrypt.compare(
            data.password,
            user.password
          );
          if (!validPasswordUser) {
            resolve({
              code: 2,
              message: "Password is not correct ! ! !",
            });
          } else {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            response.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            });

            resolve({
              code: 0,
              message: "Logged in successfully ! ! !",
              accessToken: accessToken,
            });
          }
        } else if (admin) {
          const validPasswordAdmin = await bcrypt.compare(
            data.password,
            admin.password
          );
          if (!validPasswordAdmin) {
            resolve({
              code: 2,
              message: "Password is not correct ! ! !",
            });
          } else {
            const accessToken = generateAccessToken(admin);
            const refreshToken = generateRefreshToken(admin);
            refreshTokens.push(refreshToken);
            response.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            });

            resolve({
              code: 0,
              message: "Logged in successfully ! ! !",
              path: "/system/admin",
              accessToken: accessToken,
            });
          }
        } else {
          resolve({
            code: 1,
            message: "Email is not correct ! ! !",
          });
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  refreshToken: (refreshToken, res) => {
    return new Promise((resolve, reject) => {
      try {
        if (!refreshToken) resolve("You are not authenticated ! ! !");
        if (!refreshTokens.includes(refreshToken)) {
          resolve("Refresh token is not valid ! ! !");
        }

        jwt.verify(
          refreshToken,
          process.env.REFRESH_KEY_SECRET,
          (err, user) => {
            if (err) console.log(err);
            refreshTokens = refreshTokens.filter(
              (token) => token !== refreshToken
            );
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            });
            resolve({ accessToken: newAccessToken });
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  },

  logout: (refreshToken, res) => {
    return new Promise((resolve, reject) => {
      try {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        resolve({
          code: 0,
          message: "Logged out ! ! !",
        });
      } catch (err) {
        reject(err);
      }
    });
  },
};
