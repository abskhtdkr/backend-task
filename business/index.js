const dao = require('../models/dao/');

module.exports.fetchCities = (daoObj) => {
    return new Promise((resolve, reject) => {
        if (daoObj.filter && daoObj.filter.q) {
            let condition = { name: { "$regex": daoObj.filter.q, "$options": "i" } }
            dao.fetchCities({ filter: condition }).then((data) => {
                if (data.result) {
                    let score = 0, result = [], obj = { name: "", latitude: "", longitude: "", score: "" };
                    data.result.map(res => {
                        if (res.lat && daoObj.filter.latitude) {
                            if (res.lat < 0 && daoObj.filter.latitude < 0) {
                                if (res.lat > daoObj.filter.latitude)
                                    score = (res.lat / daoObj.filter.latitude)
                                else
                                    score = (daoObj.filter.latitude / res.lat)
                            } else {
                                if (res.lat > daoObj.filter.latitude)
                                    score = (daoObj.filter.latitude / res.lat)
                                else
                                    score = (res.lat / daoObj.filter.latitude)
                            }
                        }
                        if (res.long && daoObj.filter.longitude) {
                            if (res.long < 0 && daoObj.filter.longitude < 0) {
                                if (res.long > daoObj.filter.longitude)
                                    score += (res.long / daoObj.filter.longitude)
                                else
                                    score += (daoObj.filter.longitude / res.long)
                            } else {
                                if (res.long > daoObj.filter.longitude)
                                    score += (daoObj.filter.longitude / res.long)
                                else
                                    score += (res.long / daoObj.filter.longitude)
                            }
                        }
                        score = score / 2;
                        score = toFixed(score, 1);
                        obj.name = res.name;
                        obj.latitude = res.lat;
                        obj.longitude = res.long;
                        obj.score = score;
                        result.push(obj);
                        obj = { name: "", latitude: "", longitude: "", score: "" };
                    })
                    result.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
                    resolve({ result: result });
                }
            }).catch(err => {
                reject({ error: "Error while performing query!", dev_err: err });
            });
        } else {
            reject({ error: "Please send query parameter!"});
        }
    });
}

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}