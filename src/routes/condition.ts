import { RouteProps } from '.';
import ConditionPage from '../pages/condition';

const conditionRoutes: RouteProps[] = [
  {
    path: '/condition/:number',
    view: ConditionPage,
  },
];

export default conditionRoutes;