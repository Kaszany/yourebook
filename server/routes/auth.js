const bcrypt = require('bcrypt');
const {User} = require('../models/User');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email:req.body.email });
	if (!user) return res.status(400).send('Podano błędny email i / lub hasło. Popraw dane i spróbuj ponownie.');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if(!validPassword) return res.status(400).send('Podano błędny email i / lub hasło. Popraw dane i spróbuj ponownie.');

	const token = user.generateAuthToken();
	res.send(token);
});

function validate(req) {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	};
	return Joi.validate(req, schema);
}

module.exports = router;