const express = require("express");
const { addToLikedMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/UserController");

const router = express.Router();

router.post('/add' , addToLikedMovies);
router.get('/liked/:email' , getLikedMovies);
router.put('/remove' , removeFromLikedMovies);



module.exports = router