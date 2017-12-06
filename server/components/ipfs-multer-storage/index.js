
var crypto = require('crypto');
var zlib = require('zlib');
var stream = require('stream');
var request = require('request');
var fs = require('fs');

function IpfsStorage(options) {  
  this.ipfsGatewayUrl = options.ipfsGatewayUrl;
}

IpfsStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  var zip = zlib.createGzip();
  var algorithm = 'aes-128-ctr';
  var key = crypto.randomBytes(16);
  var encrypt = crypto.createCipher(algorithm, key);
  var ipfsGatewayUrl = this.ipfsGatewayUrl;
  var encDataArray = [];
  var encDataBuffer;
  var memStream = new stream.Duplex;
  
  memStream._write = function(chunk, enc, next){
    encDataArray.push(chunk);
    next();
  }

  memStream.end = function(){
    encDataBuffer = Buffer.concat(encDataArray);
    
    request({
        method: 'POST',
        uri: ipfsGatewayUrl,
        body: encDataBuffer
    }, function(err, response, body){
        if(err){cb(err)}
        //var hash = response.headers.ipfs-hash;
        file.hash = response.headers['ipfs-hash'];
        file.encryptionKey = key;
        file.encryptionAlgorithm = 'aes-128-ctr';
        file.commpression = 'gzip';
        cb(null, file);
    });
  } 

  file.stream.pipe(zip).pipe(encrypt).pipe(memStream);
}

module.exports = function(options) {
  return new IpfsStorage(options);
}
