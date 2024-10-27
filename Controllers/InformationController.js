const Information = require('../models/Information');

const getAllInformations = async (req, res) => {
  try {
    const Informations = await Information.find();
    res.status(200).send(Informations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllInformations
};