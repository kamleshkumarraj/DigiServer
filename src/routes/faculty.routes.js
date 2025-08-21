import { Router } from 'express';
import { isFaculty, isLoggedIn } from '../middlewares/auth.middleware.js';
import { getFacultyProfile, getMyBranches, getSemesterForBranch } from '../controllers/faculty.controller.js';

export const facultyRouters = Router();

facultyRouters.route('/my-profile').get(isLoggedIn, isFaculty,getFacultyProfile);
facultyRouters.route('/my-branch').get(isLoggedIn, isFaculty, getMyBranches);
facultyRouters.route('/my-semester/:branchId').get(isLoggedIn, isFaculty, getSemesterForBranch);