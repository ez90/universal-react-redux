import express from "express"
import serverRenderer from '../middleware/renderer'

const router = express.Router()

// root (/) should always serve our server rendered page
router.use('^/$', serverRenderer)

export default router
