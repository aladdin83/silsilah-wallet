'use strict';

var express = require('express');
var controller = require('./document.controller');
var multer = require('multer');
var ipfsMulterStorage = require('../../components/ipfs-multer-storage')({
  ipfsGatewayUrl: 'http://localhost:32769/ipfs/'
});
var upload = multer({storage: ipfsMulterStorage});

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', upload.single('file'), controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
