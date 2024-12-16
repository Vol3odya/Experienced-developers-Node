/*import UserCollection from '../db/models/User.js';*/
import WaterCollection from '../db/models/Water.js';
import createHttpError from 'http-errors';

import UserSchema from '../db/models/User.js';

export const createWater = (payload) => {
  return WaterCollection.create(payload);
};

export const updateWater = async (filter, data, options = {}) => {
  const updateData = {};
  if (data.waterVolume !== undefined) {
    if (data.waterVolume > 5000) {
      throw createHttpError(400, 'Water volume cannot exceed 5000 ml');
    }
    updateData.waterVolume = data.waterVolume;
  }
  if (data.date !== undefined) {
    updateData.date = new Date(data.date).toISOString();
  }
  const rawResult = await WaterCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWater = (filter) => WaterCollection.findOneAndDelete(filter);



export const getTodayWater = async (userId, today) => {
  const startCurrentDate = new Date(
    today.setUTCHours(0, 0, 0, 0),
  ).toISOString();
  const endCurrentDate = new Date(
    today.setUTCHours(23, 59, 59, 999),
  ).toISOString();
  const user = await UserSchema.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const waterEntries = await WaterCollection.find({
    userId,
    date: {
      $gte: startCurrentDate,
      $lte: endCurrentDate,
    },
  }).sort({ date: 1 });

  if (!waterEntries || waterEntries.length === 0) return;

  const totalWaterVolume = waterEntries.reduce(
    (sum, item) => sum + item.waterVolume,
    0,
  );

  const { dailyNorm } = user;

  const waterVolumeInPercent = Math.min(
    Math.floor((totalWaterVolume / dailyNorm) * 100),
    100,
  );

  const waterVolumeTimeEntries = waterEntries.map((item) => ({
    _id: item._id,
    waterVolume: item.waterVolume,
    time: item.date.split('T')[1].substring(0, 5),
  }));

  return {
    totalWaterVolume,
    waterVolumeInPercent,
    waterVolumeTimeEntries,
  };
};
