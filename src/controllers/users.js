import createHttpError from 'http-errors';
import { getUserProfile, getUserWaterRate, updateUserInfo, updeteUserPhoto } from '../services/users.js';
import {saveFileToCloudinary} from '../utils/saveFileToCloudinary.js';
import {saveFileToUploadDir} from '../utils/saveFileToUploadDir.js';

import { env } from '../utils/env.js';

export const getUsersController = async (req, res, next) => {
  const userId = req.user._id;

  const userById = await getUserProfile(userId);

  if (userById === null) {
    return next(createHttpError('User not found'));
  }

  res.send({
    status: 200,
    message: `User successfully found`,
    data: userById,
  });
};


export const getUsersWaterRateController = async (req, res, next) => {

  const userId = req.user._id;

   const userById = await getUserWaterRate(userId);

  if (userById === null) {
    return next(createHttpError('User not found'));
  }

  res.send({
    status: 200,
    message: `User's ${userById.waterRate} WaterRate`,
    data: userById.waterRate,
  });

};

export const updateUserPhotoController = async (req, res, next) => {

   const userId = req.user._id;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const update = await updeteUserPhoto(userId, { photo: photoUrl });

  if (!update) throw createHttpError(404, 'User not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a photo',
    data: update.user.photo,
  });
};

export const updateUserInfoController = async (req, res) => {

  const user = req.user;
  const body = req.body;

  const data = await updateUserInfo(body, user);

  res.json({
    status: 200,
    message: 'Successfully patched an user',
    data,
  });

};


