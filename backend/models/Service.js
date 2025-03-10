import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
})

const Service = mongoose.model('Services', serviceSchema)
export default Service