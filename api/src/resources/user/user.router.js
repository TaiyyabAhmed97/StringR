import { Router } from 'express'
import {
    getUser,
    createUser
} from './user.controller'
const router = Router();

router.route('/users')
    .post(createUser)
router.route('/users/:id')
    .get(getUser)

export default router