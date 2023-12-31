const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const notFound = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();


// Apply top middleware first
app.use(express.json())  // bodyParser.json() is deprecated
app.use(express.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(helmet()); // Use helmet middleware to set security headers
app.use(cors({
  origin: config.clientOrigins[config.nodeEnv]
}))
app.disable('x-powered-by');
app.use(morgan('dev'))  // tiny


 
// Routes
const sessionRoutes = require('./src/routes/sessionRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Use some logging framework for structured logging like winston or pino.
app.use('/api/session', sessionRoutes);
app.use('/api/user', userRoutes);


// Apply error handling last
app.use(notFound)
app.use(errorHandler)

// TODO:  Additional error handling
app.use((err, req, res, next) => { /* handle error */ })


/* Here is a reason to separate everything, but this out to server.js
* https://stackoverflow.com/questions/54422849/jest-testing-multiple-test-file-port-3000-already-in-use
* while everything could be put into index.js or app.js.
* This is a viable workaround with Jest and SuperTest calling into this.
*/
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV == 'dev') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🖖`);
    console.log(`${config.name} ${config.version} 🚀`)
    console.log(`Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🐱‍💻`)
  });  
}


/**
 * Handle Ctrl+C gracefully
 */
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');

    // 99% of the time not necessary, but 1% is...
    process.exit(0);
  });
});




// Use ES6 via babel later.
module.exports = app;