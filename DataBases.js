const mongoose = require("mongoose");
const DataBases = async () => {
  try {
    const db = await mongoose.connect(`${process.env.BlogAppLink}`);
    console.log(`db is connected on port 7500 ${db.connection.host}`);
  } catch (error) {
    console.log("something", error);
  }
};
module.exports = DataBases;
