import express from 'express';

import { sendEmail} from '../Controller/EmailController.js';
import { validateEmail } from "../MIddlewear/email.middlwear.js";

const router = express.Router();

router.post('/send-email',validateEmail, sendEmail);

export default router;