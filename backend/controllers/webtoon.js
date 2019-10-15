const models = require('../models');
const User = models.user;
const Webtoon = models.webtoon;
const Favourite = models.favourite;
const Episode = models.episode;
const Image = models.image;

const index = (req, res) => {
    Webtoon.findAll({
        include: [{
            model: User,
            as: 'createdBy',
            attributes: ['name']
        }]
    }).then(webtoons => res.send(webtoons));
}

const showFavourites = (req, res) => {
    Favourite.findAll({
        include: [{
            model: Webtoon,
            as: 'webtoonId'
        },{
            model: User,
            as: 'userId',
            attributes: ['name']
        }]
    }).then(favourites => res.send(favourites));
}

const showWebtoon = (req, res) => {
    Webtoon.findOne({
        where: {
            title: req.params.title
        }
    }).then(webtoon => res.send(webtoon));
}

const showWebtoonEpisodes = (req, res) => {
    Episode.findAll({
        where: {
            webtoon_id: req.params.webtoon_id
        },
        include: [{
            model: Webtoon,
            as: 'webtoonId'
        }]
    }).then(episodes => res.send(episodes));
}

module.exports = {
    index,
    showFavourites,
    showWebtoon,
    showWebtoonEpisodes
}