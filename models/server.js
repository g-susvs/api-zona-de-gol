const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      usurios: "/api/usuarios",
      canchas: "/api/canchas",
      reservas: "/api/reservas",
      pagos: "/api/pagos",
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
    this.app.use(express.static("public"));
  }

  routes() {
    // rutas usuarios
    // rutas canchas
    this.app.use(this.paths.reservas, require("../routes/reserva"));
    this.app.use(this.paths.pagos, require("../routes/pago"));
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
