const models = require('../models');
const errorHandler = require('../handlers/errorHandler');
const User = models.user;
const Webtoon = models.webtoon;
const Sequelize = require('sequelize');

const index = (req, res) => {
    Webtoon.findAll({
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

const showMyWebtoons = (req, res) => {
    Webtoon.findAll({
        where: {
            created_by: req.params.user_id
        },
        // include: [{
        //     model: User,
        //     as: 'createdBy',
        //     attributes: ['name']
        // }]
    })
    .then(webtoons => res.send(webtoons))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

const createMyWebtoon = (req, res) => {
    const {title, genre, image} = req.body;
    Webtoon.create({
        title,
        genre,
        image,
        created_by: req.params.user_id
    })
    .then(webtoon => res.send(webtoon))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

const updateMyWebtoon = (req, res) => {
    // const {title, genre, image} = req.body;
    Webtoon.update(
    req.body,
    {where:{id: req.params.webtoon_id,created_by: req.params.user_id},
    })
    .then(() => {
        Webtoon.findOne({where: {id: req.params.webtoon_id}})
        .then(webtoons => res.send(webtoons));
    })
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

const deleteMyWebtoon = (req, res) => {
    const {user_id, webtoon_id} = req.params;
    Webtoon.destroy({where: {id: webtoon_id, created_by: user_id}})
    .then(result => res.send({
        id: webtoon_id
    }))
    .catch((error) => {
        console.log(error)
        res.send({
            error: true
        });
    });
}

module.exports = {
    index,
    showWebtoon,
    showChoicesWebtoons,
    showPolpularWebtoons,
    showMyWebtoons,
    createMyWebtoon,
    updateMyWebtoon,
    deleteMyWebtoon
}