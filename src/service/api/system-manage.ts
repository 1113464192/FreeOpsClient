import qs from 'qs';
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

/** get button list */
export function fetchGetButtonList(params?: Api.SystemManage.ButtonSearchParams) {
  return request<Api.SystemManage.ButtonList>({
    url: '/buttons',
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

/** get api tree */
export function fetchGetApiTree() {
  return request<Api.SystemManage.ApiTree[]>({
    url: '/apis/tree',
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

/** get the menu for role binding */
export function fetchGetRoleMenus(ids: number[]) {
  return request<number[]>({
    url: '/roles/menus',
    method: 'get',
    params: {
      ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    }
  });
}

export function fetchGetRoleApis(ids: number[]) {
  return request<number[]>({
    url: '/roles/apis',
    method: 'get',
    params: {
      ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    }
  });
}

export function fetchGetRoleButtons(ids: number[]) {
  return request<number[]>({
    url: '/roles/buttons',
    method: 'get',
    params: {
      ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    }
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

export function updateRole(data: Api.SystemManage.Role) {
  return request({
    url: '/roles',
    method: 'post',
    data
  });
}

export function updateRoleRelation(data: Api.SystemManage.RoleRelation) {
  return request({
    url: '/roles/bind',
    method: 'put',
    data
  });
}

export function updateButton(buttons: Api.SystemManage.UpdateButtonParams[]) {
  return request({
    url: '/buttons',
    method: 'post',
    data: {
      buttons
    }
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

export function deleteMenus(ids: number[]) {
  return request({
    url: '/menus',
    method: 'delete',
    data: {
      ids
    }
  });
}
