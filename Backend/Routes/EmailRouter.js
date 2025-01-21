import express from 'express';
import { sendEmail,verifyCode } from '../Controller/EmailController.js';

const router = express.Router();

router.post('/send-email', sendEmail);
router.post('/verify-code',verifyCode)

export default router;