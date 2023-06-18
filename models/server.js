const express = require("express");
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      usurios: "/api/usuarios",
      canchas: "/api/canchas",
      reservas: "/api/reservas",
      uploads: "/api/uploads"
    };

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
      await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    //carga de archivo
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));

  }

  routes() {
    // rutas usuarios
    // rutas canchas
    this.app.use(this.paths.canchas, require('../routes/cancha')),
    this.app.use(this.paths.uploads, require('../routes/uploads'))
    // rutas reservas
    this.app.get("/", (req, res) => {
      res.send("ZONA DE GOL - API");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
