const models = require('../models');
const errorHandler = require('../handlers/errorHandler');
const Webtoon = models.webtoon;
const Favourite = models.favourite;

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

const addMyFavourite = (req, res) => {
    const { user_id, webtoon_id } = req.params;
    Favourite.create({
        user_id: req.params.user_id,
        webtoon_id: req.params.webtoon_id
    })
    .then(result => res.send(result))
    .catch(err => console.log(err));
}

const deleteMyFavourite = (req , res) => {
    console.log(req.params.favourite_id);
    Favourite.destroy({
        where: {
            id: req.params.favourite_id,
            user_id: req.params.user_id,
            webtoon_id: req.params.webtoon_id
        }
    })
    .then(result => res.send({
        id: result
    }))
    .catch(err => console.log(err));
}

module.exports = {
    showMyFavourites,
    showFavourites,
    addMyFavourite,
    deleteMyFavourite
}