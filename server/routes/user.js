const router = require('express').Router();
const {listUsersController,queryUserController,DELETEuserController,POSTregisterUserController} =  require('../controllers/usersController');

router.get('/list',listUsersController);
router.post('/register',POSTregisterUserController);
router.delete('/delete/:id',DELETEuserController);
router.get('/:id',queryUserController)

module.exports = router;
