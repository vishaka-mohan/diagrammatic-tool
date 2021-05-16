const {Router} = require('express');
const userController = require('../controllers/userController');
const {requireAuth, checkUser} = require('../middleware/authMiddleware');

const bodyParser = require('body-parser');

const router = Router();



router.get('/dashboard', requireAuth, userController.dashboard_get);
router.get('/adDashboard', requireAuth, userController.adDashboard_get);
router.get('/workspace/:id', requireAuth, userController.docs_get);
router.post('/workspace/:id', requireAuth, userController.docs_post);
router.get('/workspace/:id/:docName', requireAuth, userController.saved_docs_get);
router.post('/workspace/:id/:docName', requireAuth, userController.saved_docs_post);
router.get('/workspace/:id/:docName/collab', requireAuth, userController.saved_docs_collab_get);
router.post('/workspace/:id/:docName/collab', requireAuth, userController.saved_docs_collab_post);
router.get('/feedback', requireAuth, userController.feedback_get);
router.post('/feedback', requireAuth, userController.feedback_post);

module.exports = router;