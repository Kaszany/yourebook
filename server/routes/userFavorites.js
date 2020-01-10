const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

router.get('/api/users/:email', async (req, res) =>{
    
    const user = await User.find({email: req.params.email}, req.body)
    
        res.json(user);    
        
})

module.exports = router;