import mongoose from "mongoose";

const indexSchema = mongoose.Schema({
    _id: String,
    index: Number
});

const Index = mongoose.model("index", indexSchema);

export default Index;