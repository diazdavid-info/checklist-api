const router = require('express').Router({
    mergeParams: true,
});
const controller = require('./controller');
const {auth, owner} = require('../auth');
const {sanitizers} = require('./model');

router.param('id', controller.id);

router
    .route('/')
    .post(auth, controller.parentId, sanitizers, controller.create)
    /**
     * @swagger
     * /tasks/:
     *  get:
     *      tags:
     *          - Tasks
     *      description: Get all tasks
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              schema:
     *                  type: array
     *                  items:
     *                      type: object
     *                      properties:
     *                          id:
     *                              type: string
     *                          title:
     *                              type: string
     *                          completed:
     *                              type: boolean
     *                          description:
     *                              type: string
     *                          url:
     *                              type: string
     *                          dueDate:
     *                              type: string
     *                              format: date-time
     *                          created_at:
     *                              type: string
     *                              format: date-time
     *                          updated_at:
     *                              type: string
     *                              format: date-time
     */
    .get(auth, controller.parentId, controller.all);

router
    .route('/:id')
    .get(auth, controller.parentId, controller.read)
    .put(auth, owner, controller.parentId, sanitizers, controller.update)
    .delete(auth, owner, controller.parentId, controller.delete);

module.exports = router;