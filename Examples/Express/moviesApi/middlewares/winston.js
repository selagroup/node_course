const winston = require('winston');
const options = { 
    
    level:  process.env.LOG_LEVEL || 'debug',
    handleExceptions: true,
    colorize: true
}

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});


logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };
module.exports = logger;
