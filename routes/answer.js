const express = require("express");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
const answerController = require("../controllers/answer");
const router = express.Router();

// Add Answer
router.post("/:questionId", [
    auth,
    [
        check("text", "Text is required!").notEmpty()
    ]
], answerController.addAnswer);


// Update answer
router.put("/:answerId", [
    auth,
    [
        check("text", "Text is required!").notEmpty()
    ]
], answerController.editAnswer);

// Get Answer belonging to a question
router.get("/:questionId", answerController.getQuestions);

// Delete Answer
router.delete("/:answerId", auth, answerController.deleteAnswer)


module.exports = router;
