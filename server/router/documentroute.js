import { Router } from "express";
const router = Router();

import * as controller  from '../controllers/documentController.js'

router.post('/create').post(controller.createDocument);

router.get('/all').get(controller.getAllDocuments);

router.get('/:documentId').get(controller.getDocumentById);

router.put('/update/:documentId').put(controller.updateDocument);

router.delete('/delete/:documentId').delete(controller.deleteDocument);

export default router;