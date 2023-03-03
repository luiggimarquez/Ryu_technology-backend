import nodemailer from "nodemailer"
import ejs from 'ejs'
import { logger, loggerError } from "./log.js";
import { __dirname } from "../server.js";
import config from "../config.js";

const transport = nodemailer.createTransport({
	host: config.NODEMAILER_HOST,
	port: config.NODEMAILER_PORT,
	auth: {
		user: config.NODEMAILER_MAIL,
		pass: config.NODEMAILER_CODE
	}
});

const sendEmailOrder = (receiver, subject, result, message) => {

	ejs.renderFile(__dirname +'/public/views/templates/sendMailOrder.ejs', {receiver,result, message}, (err, data) => {

		if (err) {
			logger.info(err);
			loggerError.error(err)
		} else {

			let mailList= [ receiver, config.ADMINMAIL]

			let mailOptions = {
				from: 'RyuTechnology <Admin@RyuTech.com>',
				to: mailList,
				subject: subject,
				html: data
			};

			transport.sendMail(mailOptions, (error, info) => {
				if(error){
					loggerError.error(error)
					return logger.info(error);
				}
				logger.info('Message sent: %s', info.messageId);
			});
		}
	});
};

const sendEmailRegister = (receiver, subject, content, message) => {

	ejs.renderFile(__dirname +'/public/views/templates/sendMail.ejs', {receiver,content, message}, (err, data) => {

		if (err) {
			logger.info(err);
			loggerError.error(err)
		} else {

			let mailOptions = {
				from: 'RyuTechnology <Admin@RyuTech.com>',
				to: receiver,
				subject: subject,
				html: data
			};

			transport.sendMail(mailOptions, (error, info) => {
				if(error){
					loggerError.error(error)
					return logger.info(error);
				}
				logger.info('Message sent: %s', info.messageId);
			});
		}
	});
};

export { sendEmailRegister, sendEmailOrder }