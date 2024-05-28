import { RouteProps } from 'react-router-dom';

export enum Pages {
  Welcome = 'Welcome',
  Users = 'Users',
  Page2 = 'Page2',
  Page3 = 'Page3',
  Page4 = 'Page4',
  NotFound = 'NotFound',
  Login = 'Login',
  Register = 'Register',
}

export interface CustomRouteProps extends Omit<RouteProps, 'path'> {
  path: string;
  component: React.ComponentType;
  title?: string;
  icon?: React.ElementType;
  isProtected?: boolean;
}

export type Routes = Record<Pages, CustomRouteProps>;
