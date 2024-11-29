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

// 新增/修改 操作模板
export function updateTemplate(data: Omit<Api.OpsManage.Template, 'status'>) {
  return request({
    url: '/ops/template',
    method: 'post',
    data
  });
}

// 删除操作模板
export function deleteTemplates(ids: number[]) {
  return request({
    url: '/ops/template',
    method: 'delete',
    data: {
      ids
    }
  });
}

// 获取操作模板列表
export function fetchGetTemplateList(params?: Api.OpsManage.TemplateSearchParams) {
  return request<Api.OpsManage.TemplateList>({
    url: '/ops/template',
    method: 'get',
    params
  });
}

// 关联操作模板参数模板
export function updateTemPlateParams(data: Api.OpsManage.BindTemplateParam) {
  return request({
    url: '/ops/bind-template-params',
    method: 'put',
    data
  });
}

// 查看操作模板关联的参数模板
export function fetchGetTemplateParams(id: number) {
  return request<Array<Omit<Api.OpsManage.ParamTemplate, 'status'>>>({
    url: '/ops/template-params',
    method: 'get',
    params: {
      id
    }
  });
}

// 新增/修改 参数模板
export function updateParamTemplate(data: Omit<Api.OpsManage.ParamTemplate, 'status'>) {
  return request({
    url: '/ops/param-template',
    method: 'post',
    data
  });
}

// 删除参数模板
export function deleteParamTemplates(ids: number[]) {
  return request({
    url: '/ops/param-template',
    method: 'delete',
    data: {
      ids
    }
  });
}

// 获取参数模板列表
export function fetchGetParamTemplateList(params?: Api.OpsManage.ParamTemplateSearchParams) {
  return request<Api.OpsManage.ParamTemplateList>({
    url: '/ops/param-template',
    method: 'get',
    params
  });
}

// 新增/修改 操作任务
export function updateTask(data: Omit<Api.OpsManage.Task, 'status' | 'projectName' | 'hostName'>) {
  return request({
    url: '/ops/task',
    method: 'post',
    data
  });
}

// 删除任务
export function deleteTasks(ids: number[]) {
  return request({
    url: '/ops/task',
    method: 'delete',
    data: {
      ids
    }
  });
}

// 获取任务列表
export function fetchGetTaskList(params?: Api.OpsManage.TaskSearchParams) {
  return request<Api.OpsManage.TaskList>({
    url: '/ops/task',
    method: 'get',
    params
  });
}

// 提交执行任务
export function submitTask(data: Api.OpsManage.SubmitTask) {
  return request({
    url: '/ops/submit-task',
    method: 'post',
    data
  });
}

// 运行任务检查脚本
export function runTaskCheckScript(taskId: number, execContent: string) {
  return request<Array<Api.Common.SSHResult>>({
    url: '/ops/run-task-check-script',
    method: 'post',
    data: {
      taskId,
      execContent
    }
  });
}

// 获取根据模板与运营执行需求内容生成的命令
export function fetchGetTaskCommand(templateIds: number[], execContent: string) {
  return request<string[]>({
    url: '/ops/commands',
    method: 'post',
    data: {
      templateIds,
      execContent
    }
  });
}
