const express=require('express')
const router=express.Router();
const controller=require("../controller/user.controller.js")
const authMiddleware=require("../../../api/v1/middleware/auth.middleware.js")
router.post('/register',controller.register)
router.post('/login',controller.login)
router.post('/password/forgot',controller.forgotPassword)
router.post('/password/otp',controller.otpPassword)
router.post('/password/resetPassword',controller.resetPassword)
router.get('/detail',authMiddleware.requireAuth,controller.detail)
router.get('/list',authMiddleware.requireAuth,controller.list)
module.exports=router;