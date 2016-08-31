let request = require(`request`);

request.debug = true;

class RequestMid {
  request(options) {
    let requestOptions = {
      'url': options.url,
      'headers': {},
      'method': options.method || 'GET'
    }

    if(options.req.headers.cookie) {
      requestOptions.headers.cookie = options.req.headers.cookie;
    }

    if(options.jsonParams) {
      requestOptions.json = options.jsonParams;
    }

    request(requestOptions, (error, response, body) => {
      if(response.statusCode === 401) {
        options.res.redirect(`/login?posLogin=${encodeURIComponent(escape(options.req.url))}`);
        return false;
      }

      options.cb(error, response, body);
    });
  }
}

module.exports = new RequestMid();
