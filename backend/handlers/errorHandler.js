const errValidationHandler = (e) => {
    switch (e.validatorKey) {
        case 'is_null':
            return e.path + ' ' + ' cannot be empty.'
            break;
        case 'not_unique':
            return e.path + ' ' + e.value + ' already exists, please replace with another.'
            break;
        default:
            break;
    }
}

module.exports = {
    errValidationHandler
}