const express = require('express');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.paths = {
			usurios: '/api/usuarios',
			canchas: '/api/canchas',
			reservas: '/api/reservas',
		};

		this.conectarDB();
		this.middlewares();
		this.routes();
	}

	async conectarDB() {
		// await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	routes() {
		// rutas usuarios
		// rutas canchas
		// rutas reservas
		this.app.get('/', (req, res) => {
			res.send('ZONA DE GOL - API');
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
