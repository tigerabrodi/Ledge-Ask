const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    profession: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        virtuals: true
    }
});

UserSchema.virtual("questions", {
    ref: "Question",
    localField: "_id",
    foreignField: "user"
})

module.exports = mongoose.model("User", UserSchema);