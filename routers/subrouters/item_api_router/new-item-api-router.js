// Rota /api/inner/item/new
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, INSERT_INTO} = require('../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR,ITEM_NOT_FOUND} = require('../../../utils/error-messages')


router.post('/', (req,res)=>{

	var 


})


module.exports = router
