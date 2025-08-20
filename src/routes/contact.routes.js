import {Router} from 'express'
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { createContact, deleteContact, updateContact } from '../controllers/contact.controller.js';

export const contactRouter = Router();

contactRouter.route("/create-contact").post(isLoggedIn, createContact);
contactRouter.route("/update-contact/:id").put(isLoggedIn, updateContact);
contactRouter.route("/delete-contact/:id").delete(isLoggedIn, deleteContact);