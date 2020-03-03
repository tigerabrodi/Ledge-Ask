const Answer = require("../models/Answer");
const User = require("../models/User");
const Question = require("../models/Question");
const {validationResult} = require("express-validator");


// @route    POST /answers/:questionId
// @desc     Answer a Question
// @access   Private
exports.addAnswer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const question = await Question.findById(req.params.questionId);

        if (!question) {
            res.status(404).json({msg: "Question not found"});
        }

        let answer = new Answer({
            user: req.user.id,
            text: req.body.text,
            question: req.params.questionId 
        });
        answer = await answer.save();
        res.status(201).json(answer);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    GET /answers/:questionId
// @desc     Get all the answers belonging to a certain Question
// @access   Private
exports.getQuestions = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if (!question) {
            return res.status(404).json({msg: "question do not exists"});
        }
        const answers = await Answer.find({question: question._id}).sort({date: -1}).populate("user").select("-password");
        res.status(200).json(answers);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    DELETE /answers/:answerId
// @desc     Delete Answer
// @access   Private
exports.deleteAnswer = async (req, res, next) => {
    try {
        const answer = await Answer.findById(req.params.answerId);
        if(!answer) {
            return res.status(404).json({msg: "Answer do not exist"})
        }
        if (answer.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "You have no permission to delete this answer"})
        }
        await answer.remove();
        res.status(200).json({msg: "Answer Removed"});
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    PUT /answers/:answerId
// @desc     Edit an answer
// @access   Private
exports.editAnswer = async (req, res, next) => {
    try {
        let answer = await Answer.findById(req.params.answerId);
        if (!answer) {
            return res.status(404).json({msg: "Answer do not exist"});
        }
        if (answer.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "You have no permission to edit this answer"});
        }
        answer = await Answer.findByIdAndUpdate(req.params.answerId, req.body);
        res.status(200).json(answer);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}