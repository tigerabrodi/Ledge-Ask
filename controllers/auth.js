const {validationResult} = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");


// @route    POST /auth/register
// @desc     Register User
// @access   Public
exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, profession } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }


      user = new User({
        name,
        email,
        password,
        profession
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
          next();
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
      next(err);
    }
}


// @route    POST /auth/login
// @desc     Authenticate user & get token
// @access   Public
exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }


      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
          next();
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
      next(err);
    }
}


// @route    GET /auth
// @desc     Get User
// @access   Public
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    GET /auth/:userId
// @desc     Get User by his or her id
// @access   Public
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({msg: "User not found"});
    }
    res.status(200).json(user);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    next(err);
  }
}

// @route    PUT /auth/image
// @desc     Image Upload For Users
// @access   Private
exports.addImage = async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({msg: "User not found"})
    }

    if (!req.file) {
      return res.status(400).json({msg: "Please upload an Image!"})
    }

    const image = "/" + req.file.path.replace("\\" ,"/");

    user = await User.findByIdAndUpdate(req.user.id, {image});
    await user.save();
    res.status(200).json(user);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    next(err);
  }
}
