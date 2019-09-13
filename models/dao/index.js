const model = require('../cities');
module.exports.fetchCities = async (dao_obj) => {
    try {
        console.log(dao_obj)
      let cityData = await model.cities.find(dao_obj.filter)
        .select(dao_obj.select).skip(dao_obj.skip).limit(dao_obj.limit).sort(dao_obj.sort);
      if (cityData.length > 0)
        return { result: cityData };
      else
        return { error: "City not found" };
    } catch (error) {
      return { error: error };
    }
  };