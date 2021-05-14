const router = require('express').Router();
const tasksRouter = require('../tasks/routes');
const controller = require('./controller');

router.route('/')
    .get(controller.all)
    .post(controller.create);

router.param('id', controller.id);

router.route('/:id')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);

router.use('/:userId/tasks', tasksRouter);

module.exports = router;