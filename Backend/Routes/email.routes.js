import express from 'express';

import { sendEmail} from '../Controller/Email.controller.js';
import validateEmail from "../MIddlewear/email.middlwear.js";

const EmailRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Emails
 *   description: API for sending emails
 */

/**
 * @swagger
 * /emails/send-email:
 *   post:
 *     summary: Send an email
 *     tags: [Emails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 example: "recipient@example.com"
 *               subject:
 *                 type: string
 *                 example: "Welcome to our service!"
 *               message:
 *                 type: string
 *                 example: "Thank you for signing up. We appreciate your support."
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Invalid email format
 *       500:
 *         description: Internal server error
 */
EmailRouter.post("/send-email", validateEmail, sendEmail);

export default EmailRouter;