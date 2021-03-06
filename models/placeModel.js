import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userName: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  image: { type: String },
  rating: { type: Number },
}, {
  timestamps: true,
})

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  area: { type: String, required: true },
  address: { type: String, required: true },
  postcode: { type: String, required: true },
  district: { type: String, required: true },
  region: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  rating: { type: Number, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  reviews: [reviewSchema],
})

export default mongoose.model('PlaceModel' , placeSchema)