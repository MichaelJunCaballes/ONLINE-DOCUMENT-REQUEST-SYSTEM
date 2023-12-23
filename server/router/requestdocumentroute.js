import { Router } from "express";
const router = Router();

import Auth from '../middleware/auth.js';
import * as controller  from '../controllers/requestController.js'

// REQUEST ROUTES **************************************************************************************************
/** POST Methods */
router.route('/create').post(Auth, controller.createDocumentRequest);
/** GET Methods */
router.route('/all/:studentId').get(Auth, controller.getAllDocumentRequests);
/** PUT Methods */
router.route('/update/:documentRequestId').put(Auth, controller.updateDocumentRequestStatus);
/** DELETE Method */
router.route('/delete/:documentRequestId').delete(Auth, controller.deleteDocumentRequest);

// REQUEST ROUTES ************************************************************************************************** END

export default router;