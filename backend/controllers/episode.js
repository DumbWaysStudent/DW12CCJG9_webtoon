const models = require('../models');
const Episode = models.episode;
const Image = models.image;
const handlers = require('../handlers/errorHandler');


const showWebtoonEpisodes = (req, res) => {
Episode.findAll({
        where: {
            webtoon_id: req.params.webtoon_id
        },
        // include: [{
        //     model: Webtoon,
        //     as: 'webtoonId'
        // }]
    })
    .then(episodes => res.send(episodes))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}
const showWebtoonEpisodePages = (req, res) => {
    Episode.findOne({
        where: {webtoon_id: req.params.webtoon_id}
    }).then((episode) => {
        Image.findAll({
            where: {
                id_episode: req.params.episode_id
            },
            // include: [{
            //     model: Episode,
            //     as: 'episodeId'
            // }]
        })
        .then(images => res.send(images))
        .catch((error) => {
            console.log(error)
            res.send({
                error: true
            });
        });
    })
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

const createEpisode = (req, res) => {
    console.log(req.params)
    const {image, title} = req.body;
    Episode.create({
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
    showWebtoonEpisodePages,
    createEpisode,
    showWebtoonEpisodes
}