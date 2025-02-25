import express from 'express';
import { sendEmail} from '../Controller/EmailController.js';

const router = express.Router();

router.post('/send-email', sendEmail);

export default router;