const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const {
	globalErrorHandler,
} = require('./middleware/errors/globalErrorHandler.middleware.js');
const { routes } = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// Must be after middleware
app.use(routes);

// Must be after routes
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server has started on port: ${PORT}`);
});
