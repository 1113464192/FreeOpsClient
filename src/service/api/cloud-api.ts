import { request } from '../request';

// 新增云项目
export function createCloudProject(name: string, cloudPlatform: string) {
  return request({
    url: '/clouds/create/project',
    method: 'post',
    data: {
      name,
      cloudPlatform
    }
  });
}

// 修改云项目
export function updateCloudProject(name: string, cloudPlatform: string) {
  return request({
    url: '/clouds/update/project',
    method: 'post',
    data: {
      name,
      cloudPlatform
    }
  });
}

// 查询云项目的云ID
export function getCloudProjectId(name: string, cloudPlatform: string) {
  return request<number>({
    url: '/clouds/query/project',
    method: 'get',
    params: {
      name,
      cloudPlatform
    }
  });
}

// 购买云服务器
export function createCloudHost(projectId: number, cloudPlatform: string, hostCount: number) {
  return request({
    url: '/clouds/create/host',
    method: 'post',
    params: {
      projectId,
      cloudPlatform,
      hostCount
    }
  });
}
