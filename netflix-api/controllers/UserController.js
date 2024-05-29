const UserModel = require('../models/UserModel.js');

const addToLikedMovies = async (req, res) => {
    const { email, data } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

            if (!movieAlreadyLiked) {
                await UserModel.findByIdAndUpdate(
                    user._id,
                    { likedMovies: [...user.likedMovies, data] },
                    { new: true }
                );
                return res.json({ message: "Movie added successfully" });
            } else {
                return res.json({ message: "Movie already added to the liked list" });
            }
        } else {
            await UserModel.create({ email, likedMovies: [data] });
            return res.json({ message: "Movie added successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error adding movie', error });
    }
};


const getLikedMovies = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.json({ message: "success", movies: user.likedMovies });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving liked movies', error });
    }
};


const removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
            if (movieIndex === -1) {
                res.status(400).send({ msg: "Movie not found." });
            }
            likedMovies.splice(movieIndex, 1);
            await UserModel.findByIdAndUpdate(
                user._id,
                {
                    likedMovies
                },
                { new: true }
            );
            return res.json({ msg: "Movie successfully removed.", movies: likedMovies });
        } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
        return res.json({ msg: "Error removing movie to the liked list" });
    }
}

module.exports = { addToLikedMovies, getLikedMovies, removeFromLikedMovies };
