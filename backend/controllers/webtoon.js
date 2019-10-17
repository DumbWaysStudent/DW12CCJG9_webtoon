const models = require('../models');
const errorHandler = require('../handlers/errorHandler');
const User = models.user;
const Webtoon = models.webtoon;
const Favourite = models.favourite;
const Sequelize = require('sequelize');

const index = (req, res) => {
    Webtoon.findAll({
        include: [{
            model: User,
            as: 'createdBy',
            attributes: ['name']
        }],
        attributes: ['id', 'title', 'genre', 'image', 'created_by', 'favourite_count']
    })
    .then(webtoons => res.send(webtoons))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}
//
const showMyFavourites = (req, res) => {
    Favourite.findAll({
        where: {user_id: req.params.user_id},
        include: [{
            model: Webtoon,
            as: 'webtoonId'
        }]
        // {
        //     model: User,
        //     as: 'userId',
        //     attributes: ['name']
        // }]
    })
    .then(favourites => res.send(favourites))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

const showFavourites = (req, res) => {
    Favourite.findAll({
        include: [{
            model: Webtoon,
            as: 'webtoonId'
        }]
        // {
        //     model: User,
        //     as: 'userId',
        //     attributes: ['name']
        // }]
    })
    .then(favourites => res.send(favourites))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

const showWebtoon = (req, res) => {
    Webtoon.findOne({
        where: {
            title: req.params.title
        }
    })
    .then(webtoon => res.send(webtoon))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

// 3 choices webtoon
const showChoicesWebtoons = (req, res) => {
    const {gt, gte, lte, ne, in: opIn} = Sequelize.Op;
    Webtoon.findAll({
        where: {
            favourite_count: {
                [gte]: 100,
            }
        },
        limit: 3,
        attributes: [['image', 'url'], 'title']
    })
    .then(webtoons => res.send(webtoons))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

// show all popular webtoon
const showPolpularWebtoons = (req, res) => {
    const {gt, gte, lte, ne, in: opIn} = Sequelize.Op;
    Webtoon.findAll({
        where: {
            favourite_count: {
                [gte]: 100
            }
        },
        include: [{
            model: User,
            as: 'createdBy',
            attributes: ['name']
        }]
    })
    .then(webtoons => res.send(webtoons))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

module.exports = {
    index,
    showMyFavourites,
    showFavourites,
    showWebtoon,
    showChoicesWebtoons,
    showPolpularWebtoons
}