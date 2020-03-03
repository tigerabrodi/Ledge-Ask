const express = require("express");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
const questionController = require("../controllers/question");
const router = express.Router();




// Get User's Questions
router.get("/user/:userId", questionController.getUserQuestions);

// Get the business questions
router.get("/Business", questionController.getBusinessQuestions);

// get the tech questions
router.get("/Tech", questionController.getTechQuestions);

// Get a single question
router.get("/:questionId", questionController.getSingleQuestion);

// Delete Questions
router.delete("/:questionId", auth, questionController.deleteQuestion);

// Like Questions
router.put("/like/:questionId", auth, questionController.likeQuestion);

// Update Questions
router.put("/:questionId", [
    auth,
    [
        check("title", "Title is required for update").notEmpty(),
        check("description", "Description is required for update").notEmpty()
    ]
], questionController.editQuestion);

// Create Questions
router.post("/", [
    auth,
    [
        check("title", "Title is required").notEmpty(),
        check("description", "Description is required").notEmpty()
    ]
], questionController.askQuestion);



module.exports = router;