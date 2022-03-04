import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    major: String,
    degree: String,
    location: String,
    description: String,
    from: Date,
    to: Date,
    current: Boolean,
  },

  // },
  { timestamps: true }
);

export default mongoose.model("Education", EducationSchema);
