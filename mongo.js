'use strict';

module.exports = {
  init: () =>{
    if(process.env.NODE_ENV == 'production'){
      return {
        connectionString: '',
      }
    }
    else {
      return {
        connectionString: '127.0.0.1:27017/sampleDb',
      }
    }
  }
};
