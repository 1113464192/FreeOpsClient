import { request } from '../request';

/** get constant routes */
export function fetchGetConstantRoutes() {
  return request<Api.Route.MenuRoute[]>({ url: '/menus/constant-routes' });
}

/** get user routes */
// export function fetchGetUserRoutes() {
//   return request<Api.Route.UserRoute>({ url: '/route/getUserRoutes' });
// }

/**
 * whether the route is exist
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  return request<boolean>({ url: '/menus/is-route-exist', params: { routeName } });
}
