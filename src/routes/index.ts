import { Router } from "express";
import * as PageController from '../Controllers/pageController';
import { authInsta, getAccessToken} from "../Controllers/authController";

const router = Router();

router.get('/', PageController.home);
router.get('/home', PageController.home);
router.get('/sobre', PageController.about);
router.get('/projetos', PageController.projects);
// router.get('/blog', PageController.blog);
// router.get('/valida_insta', authInsta);
// router.get('/auth', getAccessToken);

export default router;
