// the three Amigas
module.exports = function logger(req, res, next) {
    // log information about the request to the console -> GET to /
    const method = req.method;
    const endpoint = req.originalUrl;
  
    console.log(`${method} to ${endpoint} at ${new Date().toISOString()}`);
  
    next(); // moves the request to the next middleware
  };
  