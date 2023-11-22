import mongoose from "mongoose";
import Index from "./index.js"

const boardSchema = mongoose.Schema({
  index: {
    type: Number,
    unique: true
  },
  author: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

boardSchema.pre("save", async function (next) {
  try {
    // 게시글이 전부 삭제된 경우 index 값을 0으로 초기화
    const count = await BoardSchema.count();
    if (count === 0) {
      await Index.findOneAndUpdate(
        { _id: "board" },
        { index: 0 },
        { new: true, upsert: true }
      );
    }

    const incIndex = await Index.findOneAndUpdate(
      { _id: "board" },
      { $inc: { index: 1 } },
      { new: true, upsert: true }
    );
    this.index = incIndex.index;

    next();
  } catch (error) {
    console.log(error);
  }
});

const BoardSchema = mongoose.model("post", boardSchema);

export default BoardSchema;