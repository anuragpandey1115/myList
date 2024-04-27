const express = require('express')
let router = express.Router()
const MyList = require('./myList.controller')



router.post('/', MyList.addToMyList );
router.delete('/:id', MyList.removeFromMyList );  
router.get("/profile/:userID", MyList.listMyItems);


module.exports = router;
