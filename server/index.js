const express = require('express');
const { routes } = require('./routes');

const app = express();

// Middleware
app.use(express.json());

// Must be after middleware
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server has started on port: ${PORT}`);
});
