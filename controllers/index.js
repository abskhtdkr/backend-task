const citiesBusiness = require('../business');

module.exports.fetchCities = (req, res) => {
    citiesBusiness.fetchCities(req.dao_obj).then((data) => {
        if (data.result) {
            res.status(200).json({ suggestions: data.result});
        } else {
            console.log(data);
            res.status(200).json({ "suggestions": [] })
        }
    }).catch(err => {
        console.log(err);
        res.json({ "suggestions": [] });
    });
}