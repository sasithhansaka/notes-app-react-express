import express from 'express';

import { sendEmail} from '../Controller/Email.controller.js';
import valideteEmail from "../MIddlewear/email.middlwear.js";

const router = express.Router();

router.post('/send-email',valideteEmail, sendEmail);

export default router;