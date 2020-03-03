const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Answer", AnswerSchema);