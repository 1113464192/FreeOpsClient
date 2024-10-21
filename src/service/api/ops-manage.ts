// import qs from 'qs';
import { request } from '../request';

// 新增/修改 游戏服对象
export function updateGame(
  data: Omit<Api.OpsManage.Game, 'projectName' | 'hostName' | 'ipv4'> & {
    // 1: 创建 2: 更新
    actionType: number;
  }
) {
  return request({
    url: '/games',
    method: 'post',
    data
  });
}

// 删除项目
export function deleteGames(ids: number[]) {
  return request({
    url: '/games',
    method: 'delete',
    data: {
      ids
    }
  });
}

// 获取游戏列表
export function fetchGetGameList(params?: Api.OpsManage.GameSearchParams) {
  return request<Api.OpsManage.GameList>({
    url: '/games',
    method: 'get',
    params
  });
}
