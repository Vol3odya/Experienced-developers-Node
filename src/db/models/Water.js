import { Schema, model } from "mongoose";

import { handleSaveError } from "./hooks.js";

/*, setUpdateSettings*/
const waterSchema = new Schema(
    {
      waterVolume: {
        type: Number,
        required: [true, '"Water Volume" is required'],
        min: [1, '"Water Volume" must be at least 1 ml'],
        max: [5000, '"Water Volume" cannot exceed 5000 ml'],
      },
      dailyNorm: {
        type: Number,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, '"User ID" is required'],
      },
      date: {
        type: String,
        required: [true, '"Date" is required'],
        validate: {
          validator: function (value) {
            return !isNaN(new Date(value).getTime());
          },
          message: '"Date" must be a valid date',
        },
      },
    },
    { versionKey: false, timestamps: true }
  );

  waterSchema.post('save', handleSaveError);


  waterSchema.post('findOneAndUpdate', handleSaveError);

  const WaterCollection = model('water', waterSchema);

  export default WaterCollection;
