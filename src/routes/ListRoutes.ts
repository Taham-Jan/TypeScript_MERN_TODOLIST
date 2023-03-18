
import express from 'express';
import * as listController from '../controllers/ListControllers'

const router = express.Router()

router.get('/',listController.listController);
router.get('/:listid',listController.getlistbyid);
router.post('/',listController.newlistcontroller);
router.patch('/:listid',listController.updateListConstroller);
router.delete('/:listid',listController.deleteListController);
 
export default router;