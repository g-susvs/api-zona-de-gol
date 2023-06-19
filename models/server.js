const express = require('express');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3001;
		this.paths = {
			usuarios: '/api/usuarios',
			canchas: '/api/canchas',
			reservas: '/api/reservas',
			uploads: '/api/uploads',
			pagos: '/api/pagos',
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

		// carga de archivo
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				createParentPath: true,
			})
		);
		this.app.use(express.static('public'));
		this.app.set('view engine', 'hbs');
	}

	routes() {
		// rutas usuarios
		this.app.use(this.paths.usuarios, require('../routes/usuario'));
		// rutas canchas
		this.app.use(this.paths.canchas, require('../routes/cancha'));
		this.app.use(this.paths.uploads, require('../routes/uploads'));
		// rutas reservas
		this.app.use(this.paths.reservas, require('../routes/reserva'));
		this.app.use(this.paths.pagos, require('../routes/pago'));
		this.app.get('/', (req, res) => {
			res.send('ZONA DE GOL - API');
		});

		this.app.get('/pago', (req, res) => {
			res.render('pago');
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
