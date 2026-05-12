import { Router } from 'express';
import ScriptControllers from './scripts.controllers';

const router = Router();

router.get('/', ScriptControllers.dummyScript);

export default router;


