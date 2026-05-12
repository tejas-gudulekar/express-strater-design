import dotenv from 'dotenv';
dotenv.config();
import { Router } from 'express';
import scriptRoutes from './scripts/scripts.routes'

const router = Router();
const environment = process.env.NODE_ENV || 'development';
interface IRoutes {
  path: string,
  route: Router
}

// Production Routes
const productionRoutes: IRoutes[] = [
  {
    path:'/scripts',
    route: scriptRoutes
  }
];

// Development Routes
const devRoutes: IRoutes[] = [
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
];

// Setting the production route
productionRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Setting the development route
if (environment === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
