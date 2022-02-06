import sha256 from 'crypto-js/sha256';


function aIDGenerator() {
  const crypto = require('crypto');
  const hash = crypto.getHashes();
  const x = String(Math.random())
  const hashPwd = crypto.createHash('sha1').update(x).digest('hex');
  //console.log(hashPwd); 

  return(hashPwd);
}

export {aIDGenerator}; 
