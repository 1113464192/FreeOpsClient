import qs from 'qs';
import { request } from '../request';

// 新增/修改 项目对象
export function updateProject(data: Omit<Api.AssetManage.Project, 'status'>) {
  return request({
    url: '/projects',
    method: 'post',
    data
  });
}

// 删除项目
export function deleteProjects(ids: number[]) {
  return request({
    url: '/projects',
    method: 'delete',
    data: {
      ids
    }
  });
}

// 获取项目列表
export function fetchGetProjectList(params?: Api.AssetManage.ProjectSearchParams) {
  return request<Api.AssetManage.ProjectList>({
    url: '/projects',
    method: 'get',
    params
  });
}

// 获取项目列表简要信息
export function fetchAllProjects() {
  return request<Omit<Api.AssetManage.Project, 'status'>[]>({
    url: '/projects/all-summary',
    method: 'get'
  });
}

// 获取项目主机列表
export function fetchGetProjectHosts(ids: number[]) {
  return request<number[]>({
    url: '/projects/hosts',
    method: 'get',
    params: {
      ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    }
  });
}

export function fetchGetProjectGames(ids: number[]) {
  return request<number[]>({
    url: '/projects/games',
    method: 'get',
    params: {
      ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    }
  });
}

export function updateHost(data: Omit<Api.AssetManage.Host, 'status'>) {
  return request({
    url: '/hosts',
    method: 'post',
    data
  });
}

export function fetchGetHostList(params: Api.AssetManage.HostSearchParams) {
  return request<Api.AssetManage.HostList>({
    url: '/hosts',
    method: 'get',
    params
  });
}

export function deleteHosts(ids: number[]) {
  return request({
    url: '/hosts',
    method: 'delete',
    data: {
      ids
    }
  });
}
