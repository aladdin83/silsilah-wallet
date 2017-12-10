'use strict';

import config from '../../config/environment';

var express = require('express');
var controller = require('./document.controller');
var multer = require('multer');
var ipfsMulterStorage = require('../../components/ipfs-multer-storage')({
  ipfsGatewayUrl: config.ipfs.ipfsGatewayUrl
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
