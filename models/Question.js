const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "users"
          }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {virtuals: true}
});

QuestionSchema.virtual("answers", {
    ref: "Answer",
    localField: "_id",
    foreignField: "question"
});

module.exports = mongoose.model("Question", QuestionSchema);