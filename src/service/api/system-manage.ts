import qs from 'qs';
import { request } from '../request';

/** get home info */
export function fetchGetHomeInfo() {
  return request<Api.SystemManage.HomeInfo>({
    url: '/api/home/info',
    method: 'get'
  });
}

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/api/roles',
    method: 'get',
    params
  });
}

/** get all roles */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/api/roles/all-summary',
    method: 'get'
  });
}

/** get roles of user */
export function fetchGetUserRoles(uid: number) {
  return request<Api.SystemManage.RoleList>({
    url: `/api/users/roles`,
    method: 'get',
    params: {
      uid
    }
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/api/users',
    method: 'get',
    params
  });
}

/** get all self project */
export function fetchGetSelfAllProjects() {
  return request<CommonType.Option<number>[]>({
    url: '/api/users/project-options',
    method: 'get'
  });
}

/** get menu list */
export function fetchGetMenuList(params?: Api.SystemManage.MenuSearchParams) {
  return request<Api.SystemManage.MenuList>({
    url: '/api/menus',
    method: 'get',
    params
  });
}

/** get button list */
export function fetchGetButtonList(params?: Api.SystemManage.ButtonSearchParams) {
  return request<Api.SystemManage.ButtonList>({
    url: '/api/buttons',
    method: 'get',
    params
  });
}

/** get api list */
export function fetchGetApiList(params?: Api.SystemManage.ApiSearchParams) {
  return request<Api.SystemManage.ApiList>({
    url: '/api/apis',
    method: 'get',
    params
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/api/menus/all-pages',
    method: 'get'
  });
}

/** get api tree */
export function fetchGetApiTree() {
  return request<Api.SystemManage.ApiTree[]>({
    url: '/api/apis/tree',
    method: 'get'
  });
}

/** get api group */
export function fetchGetApiGroups() {
  return request<string[]>({
    url: '/api/apis/group',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/api/menus/tree',
    method: 'get'
  });
}

/** get the menu for role binding */
export function fetchGetRoleMenus(ids: number[]) {
  return request<number[]>({
    url: '/api/roles/menus',
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
    url: '/api/roles/apis',
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
    url: '/api/roles/buttons',
    method: 'get',
    params: {
      ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    }
  });
}

export function fetchGetRoleProjects(ids: number[]) {
  return request<number[]>({
    url: '/api/roles/projects',
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
    url: '/api/users/bind-roles',
    method: 'put',
    data: {
      userId,
      roleIds
    }
  });
}

export function updateUser(data: Api.SystemManage.User) {
  return request<string>({
    url: '/api/users',
    method: 'post',
    data
  });
}

export function updateRole(data: Omit<Api.SystemManage.Role, 'status'>) {
  return request({
    url: '/api/roles',
    method: 'post',
    data
  });
}

export function updateRoleRelation(data: Api.SystemManage.RoleRelation) {
  return request({
    url: '/api/roles/bind',
    method: 'put',
    data
  });
}

export function updateButton(buttons: Api.SystemManage.UpdateButtonParams[]) {
  return request({
    url: '/api/buttons',
    method: 'post',
    data: {
      buttons
    }
  });
}

export function updateMenu(data: Api.SystemManage.Menu) {
  return request({
    url: '/api/menus',
    method: 'post',
    data
  });
}

export function updateApi(data: Omit<Api.SystemManage.ApiModel, 'status'>) {
  return request({
    url: '/api/apis',
    method: 'post',
    data
  });
}

export function deleteUsers(ids: number[]) {
  return request({
    url: '/api/users',
    method: 'delete',
    data: {
      ids
    }
  });
}

export function deleteRoles(ids: number[]) {
  return request({
    url: '/api/roles',
    method: 'delete',
    data: {
      ids
    }
  });
}

export function deleteMenus(ids: number[]) {
  return request({
    url: '/api/menus',
    method: 'delete',
    data: {
      ids
    }
  });
}

export function deleteApis(ids: number[]) {
  return request({
    url: '/api/apis',
    method: 'delete',
    data: {
      ids
    }
  });
}

// 注意，这里的ids是菜单的ids
export function deleteMenuButtons(ids: number[]) {
  return request({
    url: '/api/buttons/menus',
    method: 'delete',
    data: {
      ids
    }
  });
}

// 用户记录查询
export async function fetchGetUserRecordList(params: Api.SystemManage.UserRecordSearchParams) {
  // 如果没有传入日期，则获取最新的日期
  if (!params.date) {
    const { data } = await fetchGetUserRecordMonths();
    if (data) {
      const dates = data.dates;
      // 如果dates不存在，就传null
      if (!dates || dates.length === 0) {
        params.date = null;
      } else {
        // 假设日期格式为 "YYYY_MM"，可以直接进行字符串比较
        const latestDate = dates.sort().pop();
        params.date = latestDate;
      }
    }
  }
  return request<Api.SystemManage.UserRecordList>({
    url: '/api/users/history-action',
    method: 'get',
    params
  });
}

// 用户操作记录表有几个月可供查询
export function fetchGetUserRecordMonths() {
  return request<Api.SystemManage.UserRecordMonthsResponse>({
    url: '/api/users/history-month-exist',
    method: 'get'
  });
}

// 修改用户密码
export function updateUserPassword(data: Api.SystemManage.UpdatePasswordParams) {
  return request({
    url: '/api/users/password',
    method: 'patch',
    data
  });
}
