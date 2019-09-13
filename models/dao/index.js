const model = require('../cities');
module.exports.fetchCities = async (dao_obj) => {
    try {
        let cityData = await model.cities.find(dao_obj.filter)
            .select(dao_obj.select).skip(dao_obj.skip).limit(dao_obj.limit).sort(dao_obj.sort);

        console.log("cityData", cityData)
        if (cityData.length > 0)
            return { result: cityData };
        else
            return { error: "City not found" };
    } catch (error) {
        return { error: error };
    }
};