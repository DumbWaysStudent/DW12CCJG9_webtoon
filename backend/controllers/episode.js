const models = require('../models');
const Episode = models.episode;
const Image = models.image;
const errorHandler = require('../handlers/errorHandler');


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

const updateEpisode = (req, res) => {
    const {image, title} = req.body;
    Episode.update({
        title,
        image
    },
    {
        where: {id: req.params.episode_id}
    })
    .then(() => {
        Episode.findOne({where: {id: req.params.episode_id}})
        .then(episode => res.send(episode));
    })
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

const deleteEpisode = (req, res) => {
    const {episode_id} = req.params;
    Episode.destroy({where: {id: episode_id}})
    .then(result => res.send({
        id: episode_id
    }))
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
    updateEpisode,
    deleteEpisode,
    showWebtoonEpisodes
}