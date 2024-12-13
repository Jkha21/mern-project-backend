import express, { IRouter } from 'express';
const router = express.Router();

import EmployeeRoutes from './employee.route';
import UserRoutes from './user.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new UserRoutes().getRoutes());
  router.use('/employees', new EmployeeRoutes().getRoutes());

  return router;
};

export default routes;
