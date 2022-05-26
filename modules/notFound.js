'use srtict';

function notFound(request, response) {
  response.status(404).send('Not Found');

}

module.exports = notFound;
