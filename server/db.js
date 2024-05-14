const Pool = require('pg').Pool;

const env = process.env.NODE_ENV || 'development';

// Connection string for Postgres database hosted on Heroku
let connectionString = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};

// Connection string for running locally
if (env === 'development') {
	connectionString = {
		user: 'postgres',
		password: 'PostgresEasyPassword',
		host: 'localhost',
		port: 5432,
		database: 'bugtracker',
	};
}

const pool = new Pool(connectionString);

module.exports = pool;
