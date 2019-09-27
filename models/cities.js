const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, default: "" },
    ascii: { type: String, default: "" },
    alt_name: { type: String, default: "" },
    lat: { type: Number, default: 0 },
    long: { type: Number, default: 0 },
    feat_class: { type: String, default: "" },
    feat_code: { type: String, default: "" },
    country: { type: String, default: "" },
    cc2: { type: String, default: "" },
    admin1: { type: Number, default: 0 },
    admin2: { type: Number, default: 0 },
    admin3: { type: Number, default: 0 },
    admin4: { type: Number, default: 0 },
    elevation: { type: String, default: "" },
    dem: { type: Number, default: 0 },
    tz: { type: String, default: "" },
    modified_at: { type: Date, default: Date.now() }});

const citySchemaDetails = mongoose.model('cities', citySchema);

module.exports = {
    cities: citySchemaDetails
}