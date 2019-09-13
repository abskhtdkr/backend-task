const dao = require('../models/dao/');

module.exports.fetchCities = (daoObj) => {
    return new Promise((resolve, reject) => {
        if (daoObj.filter && daoObj.filter.q) {
            let condition = { name: { "$regex": daoObj.filter.q, "$options": "i" } }
            console.log("condition",condition);
            dao.fetchCities({ filter: condition }).then((data) => {
                resolve({ result: data.result });
            }).catch(err => {
                reject({ error: "Error while performing query!", dev_err: err });
            });
        }
    });
}