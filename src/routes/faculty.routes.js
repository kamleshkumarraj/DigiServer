import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import { getFacultyProfile } from '../controllers/faculty.controller.js';

export const facultyRouters = Router();

facultyRouters.route('/my-profile').get(isLoggedIn, getFacultyProfile);