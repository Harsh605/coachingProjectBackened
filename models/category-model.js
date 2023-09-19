import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    // categoryImage: {
    //   public_id: {
    //     type: String,
    //     required: true
    //   },
    //   url: {
    //     type: String,
    //     required: true
    //   },
    // },
    parentId: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


const Category = mongoose.model("Category", categorySchema)

export default Category
