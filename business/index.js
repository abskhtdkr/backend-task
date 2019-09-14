const dao = require('../models/dao/');

module.exports.fetchCities = (daoObj) => {
    return new Promise((resolve, reject) => {
        if (daoObj.filter && daoObj.filter.q) {
            let condition = { name: { "$regex": daoObj.filter.q, "$options": "i" } }
            dao.fetchCities({ filter: condition }).then((data) => {
                if (data.result) {
                    let score = 0, result = [], obj = { name: "", latitude: "", longitude: "", score: "" };
                    data.result.map(res => {
                        if (res.latitude) {
                            if (res.latitude < 0 && daoObj.filter.latitude < 0) {
                                if (res.latitude > daoObj.filter.latitude)
                                    score = (res.latitude / daoObj.filter.latitude)
                                else
                                    score = (daoObj.filter.latitude / res.latitude)
                            } else {
                                if (res.latitude > daoObj.filter.latitude)
                                    score = (daoObj.filter.latitude / res.latitude)
                                else
                                    score = (res.latitude / daoObj.filter.latitude)
                            }
                        }
                        if (res.longitude) {
                            if (res.longitude < 0 && daoObj.filter.longitude < 0) {
                                if (res.longitude > daoObj.filter.longitude)
                                    score += (res.longitude / daoObj.filter.longitude)
                                else
                                    score += (daoObj.filter.longitude / res.longitude)
                            } else {
                                if (res.longitude > daoObj.filter.longitude)
                                    score += (daoObj.filter.longitude / res.longitude)
                                else
                                    score += (res.longitude / daoObj.filter.longitude)
                            }
                        }
                        score = score / 2;
                        score = toFixed(score, 1);
                        obj.name = res.name;
                        obj.latitude = res.latitude;
                        obj.longitude = res.longitude;
                        obj.score = score;
                        result.push(obj);
                        obj = { name: "", latitude: "", longitude: "", score: "" };
                    })
                    resolve({ result: result });
                }
            }).catch(err => {
                reject({ error: "Error while performing query!", dev_err: err });
            });
        }
    });
}

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}