const models = require('../models');
const Image = models.image;

const createImage = (req, res) => {
    const {title, image} = req.body;
    console.log(req.params)
    Image.create({
        id_episode: req.params.episode_id,
        webtoon_id: req.params.webtoon_id,
        created_by: req.params.user_id,
        title,
        image
    })
    .then(image => res.send(image))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

module.exports = {
    createImage,
}