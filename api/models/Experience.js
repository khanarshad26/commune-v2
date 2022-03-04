import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
  {
    userId : {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    from: Date,
    to: Date,
    current: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Experience", ExperienceSchema);
