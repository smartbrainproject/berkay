const Clarifai = require("clarifai");
const app = new Clarifai.App({ apiKey: "3b14d6679bbd43ba9562af6ef36a0601" });

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data => {
    res
      .json(data)
      .catch(err => err.status(400).json("unable to work with api"));
  });
};
const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"));
};
module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};
