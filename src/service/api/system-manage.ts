import { request } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/roles',
    method: 'get',
    params
  });
}

/** get all roles */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/roles/all-summary',
    method: 'get'
  });
}

/** get roles of user */
export function fetchGetUserRoles(uid: number) {
  return request<Api.SystemManage.RoleList>({
    url: `/users/roles`,
    method: 'get',
    params: {
      uid
    }
  });
}

/** get user list */
export function fetchGetUserList(params: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/users',
    method: 'get',
    params
  });
}

/** get menu list */
export function fetchGetMenuList(params?: Api.SystemManage.MenuSearchParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/menus',
    method: 'get',
    params
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/menus/all-pages',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/menus/tree',
    method: 'get'
  });
}

export function updateUserRoles(userId: number, roleIds: number[]) {
  return request({
    url: '/users/bind-roles',
    method: 'put',
    data: {
      userId,
      roleIds
    }
  });
}

export function updateUser(data: Api.SystemManage.User) {
  return request({
    url: '/users',
    method: 'post',
    data
  });
}

export function updateButton(data: Api.SystemManage.UpdateButtonParams[]) {
  return request({
    url: '/buttons',
    method: 'post',
    data
  });
}

export function updateMenu(data: Api.SystemManage.Menu) {
  return request({
    url: '/menus',
    method: 'post',
    data
  });
}

export function deleteUsers(ids: number[]) {
  return request({
    url: '/users',
    method: 'delete',
    data: {
      ids
    }
  });
}

export function deleteRoles(ids: number[]) {
  return request({
    url: '/roles',
    method: 'delete',
    data: {
      ids
    }
  });
}
