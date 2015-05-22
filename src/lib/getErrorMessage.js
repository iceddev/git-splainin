'use strict';

function getErrorMessage(err){
  if(err.status && err.status.text){
    return err.status.text;
  }

  if(err.error){
    return err.error;
  }

  if(err.target && err.target.error){
    return err.target.error;
  }

  if(err.message){
    return err.message;
  }

  if(err.name){
    return err.name;
  }

  if(err.code){
    return 'Chrome error code ' + err.code;
  }

  return err.toString();
}

module.exports = getErrorMessage;
