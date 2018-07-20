'use strict';

module.exports = {
  init: () =>{
    if(process.env.NODE_ENV == 'production'){
      return {
        connectionString: '',
        authOptions: {
          user: '',
          pass: '',
          auth: {
            authdb: 'admin'
          }
        }
      }
    }
    else {
      return {
        connectionString: '127.0.0.1:27017/sampleDb',
        authOptions: {
          user: 'bunch',
          pass: 'godiva',
          auth: {
            authdb: 'admin'
          }
        }
      }
    }
  }
};
