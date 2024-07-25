import Unum from "./databaseStuff.js";

module.exports = async (url) => {
  const query = { url: url };

  try {
    const article = await Unum.findOne(query);

    // if it exists, return true, otherwise add it and return false
    if (article) {
      return true;
    } else {
      const newUnum = new Unum({
        url: url,
      });

      await newUnum.save();
      return false;
    }
  } catch (error) {}
};
