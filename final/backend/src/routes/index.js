import express from 'express'
import {Router} from 'express'
import uploadRouter from './uploadRouter'
import { authecationRouter } from './authecation'

const router = Router()
router.use('/upload',uploadRouter)
router.use('/login',authecationRouter)
router.use('/publicfiles',express.static('publicfiles'))

export default router