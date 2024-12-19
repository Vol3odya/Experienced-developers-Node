import bcrypt from 'bcrypt';

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

export const patchUserWaterRate = async (userId) => {

  const user = await User.findById({ _id: userId });

  return { waterRate: user.waterRate };
};

export const updeteUserPhoto = async (userId, photo) => {

  const userPhoto = await User.findByIdAndUpdate({ _id: userId }, photo, {
    new: true,
    includeResultMetadata: true,
  });

  if (!userPhoto || !userPhoto.value) return null;

  return {
    user: userPhoto.value,
    isNew: Boolean(userPhoto?.lastErrorObject?.upserted),
  };

};

export const updateUserInfo = async (body, user) => {
  const newPassword = body.newPassword;
  const newDailyNorm = body.dailyNorm;

  if (newPassword) {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const data = await User.findOneAndUpdate(user, { ...body, password: hashPassword }, { new: true });

    return { data, };
  };

  if (newDailyNorm) {
    const data = await User.findOneAndUpdate(user, { ...body, dailyNorm: newDailyNorm }, { new: true });

    return { data, };
  }

  const data = await User.findOneAndUpdate(user, { ...body }, { new: true });

  return { data, };
};
