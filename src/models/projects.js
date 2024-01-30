import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: { type: String, unique: true, required: true, dropDups: true },
    slug: String,
    image: [{ type: Schema.Types.ObjectId, ref: 'images' }],
  },
  { timestamps: true },
);

const Project = mongoose.model('projects', ProjectSchema);

export default Project;
