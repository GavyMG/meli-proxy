const express = require('express')
const router = express.Router()
const apicache = require('apicache')
const controller = require('../controllers')

let cache = apicache.middleware


router.get('/', cache('30 minutes'), controller.sendRequest)
router.get('/:apiName', cache('2 minutes'), controller.sendRequest)
router.get('/:apiName/:id', cache('2 minutes'), controller.sendRequest)
router.get('/:apiName/:id/:detail', cache('2 minutes'), controller.sendRequest)
router.get('/:apiName/:id/:detail/:op', cache('2 minutes'), controller.sendRequest)

module.exports = router