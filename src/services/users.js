import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import User from '../db/models/User.js';

export const getUserProfile = async (userId) => {
  const user = await User.findById({ _id: userId });

  return {
    name: user.name,
    email: user.email,
    gender: user.gender,
    waterRate: user.waterRate,
    photo: user.photo,
  };
};
