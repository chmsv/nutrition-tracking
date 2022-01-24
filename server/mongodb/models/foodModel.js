import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema(
  {
    nutritionix_iddb: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    calories: {
      type: Number,
      required: true
    },
    fat: {
      type: Number,
      required: true
    },
    carbohydrate: {
      type: Number,
      required: true
    },
    protein: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('products', foodSchema)
