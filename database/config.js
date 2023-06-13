const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de Datos Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la Base de Datos");
  }
};

module.exports = {
  dbConnection,
};
