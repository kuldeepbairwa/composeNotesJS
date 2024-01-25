const express = require('express');
const User = require('../../models/user');
const createResponse = require('../../utils/genericResponse');
const authRouter = express.Router();
const auth = require('../../middleware/auth');
const { signup, signin } = require('../../controllers/authController');
const noteController = require("../../controllers/noteController");

authRouter.post('/signup',signup)
authRouter.post('/signin',signin) 


authRouter.post('/notes', auth, noteController.createNote);
authRouter.get('/notes', auth, noteController.getAllNotes);
authRouter.put('/notes/:id', auth, noteController.updateNote);
authRouter.delete('/notes/:id', auth, noteController.deleteNote);

authRouter.get("/",auth,async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    res.json(createResponse(true,"auth route",{"user_id":req.uid}));
});



module.exports = authRouter;