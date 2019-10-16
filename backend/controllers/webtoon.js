const models = require('../models');
const User = models.user;
const Webtoon = models.webtoon;
const Favourite = models.favourite;


const index = (req, res) => {
    Webtoon.findAll({
        // include: [{
        //     model: User,
        //     as: 'createdBy',
        //     attributes: ['name']
        // }]
    }).then(webtoons => res.send(webtoons));
}

const showFavourites = (req, res) => {
    Favourite.findAll({
        // include: [{
        //     model: Webtoon,
        //     as: 'webtoonId'
        // },{
        //     model: User,
        //     as: 'userId',
        //     attributes: ['name']
        // }]
    }).then(favourites => res.send(favourites));
}

const showWebtoon = (req, res) => {
    Webtoon.findAll({
        where: {
            title: req.params.title
        }
    }).then(webtoon => res.send(webtoon));
}

module.exports = {
    index,
    showFavourites,
    showWebtoon
}