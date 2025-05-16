let express = require('express');
let TodoModel = require('../models/todo');
const { todoinsert, todoremove, todoupdate, todolist } = require('../controllers/todocontroller');
let router = express.Router();

router.post('/insert', todoinsert)
router.get('/view', todolist);
router.delete('/remove/:id', todoremove);
router.put('/update/:id', todoupdate);


module.exports = router;