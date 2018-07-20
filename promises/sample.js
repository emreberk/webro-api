'use strict';

module.exports = {
  createPromise: function (param) {
    return new Promise((resolve, reject) => {
      if(param){
        let result = {success:true, message: 'Promise resolved successfully'};
        resolve(result);
      }
      else{
        //co.wrapper catches reject results
        let error = {success:false, message: 'Exception has been thrown!'};
        reject(error);
      }
    });
  }
};