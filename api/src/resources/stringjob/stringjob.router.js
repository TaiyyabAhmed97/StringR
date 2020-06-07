import { Router } from 'express'
import {
    getStringJob,
    createStringJob
} from './stringjob.controller'
const router = Router();

router.route('/stringjob')
    .post(createStringJob)
router.route('/stringjob/:id')
    .get(getStringJob)

export default router