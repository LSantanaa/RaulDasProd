import { Router } from "express";
import * as PageController from '../Controllers/pageController';

const router = Router();

router.get('/', PageController.home);
router.get('/sobre', PageController.about);
router.get('/projetos', PageController.projects);
router.get('/blog', PageController.blog);

export default router;