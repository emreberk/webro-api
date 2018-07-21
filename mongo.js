'use strict';

module.exports = {
  init: () =>{
    if(process.env.NODE_ENV == 'production'){
      return {
        connectionString: 'mongodb://webro:webro11@ds247171.mlab.com:47171/webro',
      }
    }
    else {
      return {
        connectionString: '127.0.0.1:27017/sampleDb',
      }
    }
  }
};
