import { Router } from 'express'

import api from './api/index.api.js'
import views from './views/index.view.js'

const router = Router()

router.use('/api', api)
router.use('/views', views)

export default router
