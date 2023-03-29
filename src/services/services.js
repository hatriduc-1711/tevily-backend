import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../model/Users.js';
import { Admin } from '../model/Admins.js';
import {Tour} from '../model/Tours.js';

const Users = mongoose.model('User', User);
const Admins = mongoose.model('Admin', Admin);
const Tours = mongoose.model('Tour', Tour);

export const checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const emailUser = await Users.findOne({ email: userEmail})
            const emailAdmin = await Admins.findOne({ email: userEmail})
            !!emailUser || !!emailAdmin ? resolve(true) : resolve(false)
        } catch (e) {
            reject(e);
        }
    })
}

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        } catch (e) {
            reject(e);
        }
    })
}

export const checkTitle = (title) => {
    return new Promise(async (resolve, reject) => {
        try {
            const titleTour = await Tours.findOne({ title: title})
            !!titleTour  ? resolve(true) : resolve(false)
        } catch (e) {
            reject(e);
        }
    })
} 