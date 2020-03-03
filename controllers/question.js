const {validationResult} = require("express-validator");
const Question = require("../models/Question");
const User = require("../models/User");
const Answer = require("../models/Answer")

// @route    POST /questions
// @desc     Ask Question
// @access   Private
exports.askQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title, description, category} = req.body;
        const question = new Question({
            user: req.user.id,
            category,
            title, 
            description
        });
        await question.save();
        res.status(201).json(question);
        next(err);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}

// @route    GET /questions/business
// @desc     Get Business Questions
// @access   Public
exports.getBusinessQuestions = async (req, res, next) => {
    try {

        const currentPage = req.query.page || 1;
        const perPage = 8;
        let totalItems;
        
        const totalQuestionItems = await Question.find({category: "Business"}).countDocuments();
        totalItems = totalQuestionItems;

        const questions = await Question.find({category: "Business"})
        .populate("user").select("-password")
        .skip((currentPage - 1) * perPage)
        .limit(perPage)

        let counter = questions.length;

        // While there are elements in the questions array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);
    
            // Decrease counter by 1
            counter--;
    
            // And swap the last element with it
            let temp = questions[counter];
            questions[counter] = questions[index];
            questions[index] = temp;
        }

        res.status(200).json({
          msg: "Fetched business questions successfully", 
          questions: questions, 
          totalItems: totalItems
        });
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    GET /questions/tech
// @desc     Get Tech Questions
// @access   Public
exports.getTechQuestions = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 5;
        let totalItems;

        const totalQuestionItems = await Question.find({category: "Tech"}).countDocuments();
        totalItems = totalQuestionItems;

        const questions = await Question.find({category: "Tech"})
        .populate("user").select("-password")
        .skip((currentPage - 1) * perPage)
        .limit(perPage)

        let counter = questions.length;

        // While there are elements in the questions array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);
    
            // Decrease counter by 1
            counter--;
    
            // And swap the last element with it
            let temp = questions[counter];
            questions[counter] = questions[index];
            questions[index] = temp;
        }

        res.status(200).json({
          msg: "Fetched technology questions successfully", 
          questions: questions,
          totalItems: totalItems
        });
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    GET /questions/:questionId
// @desc     Get A Single Question
// @access   Private
exports.getSingleQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId).populate("user").select("-password")
    if (!question) {
      return res.status(404).json({msg: "Question not found"});
    }
    res.status(200).json(question);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    next(err);
  }
}



// @route    PUT /questions/:questionId
// @desc     Edit a Question
// @access   Private
exports.editQuestion = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let question = await Question.findById(req.params.questionId);
      if (!question) {
        return res.status(404).json({msg: "Question do not exist!"})
      }
  
      if (question.user.toString() !== req.user.id) {
        return res.status(401).json({msg: "User is not authorized"});
      }
  
      question = await Question.findByIdAndUpdate(req.params.questionId, req.body);
      await question.save();
      return res.status(200).json(question);
      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      next(err);
    }
  }


// @route    DELETE /question/:questionId
// @desc     Delete a Question
// @access   Private
exports.deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if (!question) {
          return res.status(404).json({msg: "Question do not exist"});
        }
        if (question.user.toString() !== req.user.id) {
          return res.status(401).json({msg: "You are not authorized"});
        }

        await Answer.deleteMany({question: req.params.questionId})
  
        await question.remove();
        res.status(200).json({msg: "Question Deleted"});
        next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      next(err);
    }
  }


// @route    GET /questions/user/:userId
// @desc     Get a single user's questions
// @access   Private
exports.getUserQuestions = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).json({msg: "User was not found"});
    }
    const questions = await Question.find({user: req.params.userId}).populate("user").select("-password");

    res.status(200).json(questions);
    next();
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      next(err);
  }
}


// @route    PUT /questions/like/:questionId
// @desc     Like a Question
// @access   Private
exports.likeQuestion = async (req, res) => {
    try {
      const question = await Question.findById(req.params.questionId);

      // Check if the question has already been liked
      if (question.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Question already liked' });
      }
  
      question.likes.unshift({ user: req.user.id });
  
      await question.save();
  
      res.json(question.likes);
      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      next(err);
    }
}

