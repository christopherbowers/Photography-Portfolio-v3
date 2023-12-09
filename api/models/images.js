import mongoose from 'mongoose';
const { Schema } = mongoose;

const ImageSchema = new Schema(
  {
    image_title: String,
    year: String,
    image_url: String,
    project: { type: Schema.Types.ObjectId, ref: 'projects' },
  },
  { timestamps: true },
);

const Image = mongoose.model('images', ImageSchema);

export default Image;
