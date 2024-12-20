/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current?: number;
      /** page size */
      size?: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
    }

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record status */
      status: number | null;
    } & T;
    type CommonSearchParams = Pick<PaginatingCommonParams, 'current' | 'size'>;

    type SSHResult = {
      hostIp: string;
      status: number;
      response: string;
    };
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string;
      refreshToken: string;
    }

    interface UserInfo {
      userId: string;
      username: string;
      nickname: string;
      roles: string[];
      buttons: string[];
    }
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      routes: MenuRoute[];
      home: import('@elegant-router/types').LastLevelRouteKey;
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    /** home */
    type HomeInfo = {
      projectCount: number;
      hostCount: number;
      taskNeedApproveCount: number;
      taskRunningCount: number;
    };

    /** role */
    // 保留status是为了兼容soybean框架的table.ts
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string;
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'id'>> &
      Common.CommonSearchParams;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /** role bind req */
    interface RoleRelation {
      roleId: number;
      associationType: number; // 1: api 2: menu 3: button 4: project
      objectIds: number[];
    }

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '2';

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      username: string;
      /** user gender */
      userGender: UserGender | null;
      /** user nick name */
      nickname: string;
      /** user phone */
      userPhone: string;
      /** user email */
      userEmail: string;
      /** user role code collection */
      userRoles?: number[];
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'id' | 'username' | 'userGender' | 'nickname' | 'userPhone' | 'userEmail' | 'status'>
    > &
      Common.CommonSearchParams;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = 1 | 2;

    type Button = {
      id: number;
      buttonCode: string;
      buttonDesc: string;
      menuId: number;
    };
    type ButtonList = Common.PaginatingQueryRecord<Button>;

    /**
     * icon type
     *
     * - 1: iconify icon
     * - 2: local icon
     */
    type IconType = 1 | 2;

    type MenuPropsOfRoute = Pick<
      import('vue-router').RouteMeta,
      | 'i18nKey'
      | 'keepAlive'
      | 'constant'
      | 'order'
      | 'href'
      | 'hideInMenu'
      | 'activeMenu'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
      | 'roles'
    > & {
      props?: Record<string, any> | boolean;
    };

    type Menu = Common.CommonRecord<{
      /** parent menu id */
      parentId: number;
      /** menu type */
      menuType: MenuType;
      /** menu name */
      menuName: string;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** buttons */
      buttons?: Pick<Button, 'buttonCode' | 'buttonDesc'>[] | null;
      /** children menu */
      children?: Menu[] | null;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      id: number;
      label: string;
      children?: MenuTree[];
    };

    type MenuSearchParams = CommonType.RecordNullable<Pick<Api.SystemManage.Menu, 'id' | 'menuName'>> &
      Common.CommonSearchParams;

    type UpdateButtonParams = {
      id?: number;
    } & Omit<Button, 'id'>;

    type ButtonSearchParams = CommonType.RecordNullable<{
      id?: number;
      code?: string;
      menuId?: number;
    }> &
      Common.CommonSearchParams;

    type ApiModel = Common.CommonRecord<{
      path: string;
      method: string;
      apiGroup: string;
      description?: string;
      children?: ApiModel[];
    }>;

    type ApiList = Common.PaginatingQueryRecord<ApiModel>;

    type ApiSearchParams = CommonType.RecordNullable<Partial<Pick<Api.SystemManage.ApiModel, 'apiGroup' | 'id'>>> &
      Common.CommonSearchParams;

    type ApiTree = {
      id: number;
      label: string;
      children?: ApiTree[];
    };

    type UserRecord = Common.CommonRecord<{
      ip: string;
      createdAt: string;
      method: string;
      path: string;
      agent: string;
      body: string;
      userId: number;
      username: string;
      status: number;
      latency: number;
      resp: string;
    }>;

    type UserRecordSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.UserRecord, 'username' | 'method' | 'ip'> & {
        date: string;
        status: string;
      }
    > &
      Common.CommonSearchParams;

    interface UserRecordMonthsResponse {
      dates: string[];
    }

    type UserRecordList = Common.PaginatingQueryRecord<UserRecord>;

    interface UpdatePasswordParams {
      id: number;
      newPassword: string;
    }
  }
  namespace AssetManage {
    type Project = Common.CommonRecord<{
      name: string;
      backendVersion: string;
      frontendVersion: string;
      gameRange: string;
      crossRange: string;
      commonRange: string;
      oneGameMem: number;
      oneCrossMem: number;
      oneCommonMem: number;
      cloudPlatform: string;
    }>;

    type ProjectSearchParams = CommonType.RecordNullable<Pick<Api.AssetManage.Project, 'name' | 'status'>> &
      Common.CommonSearchParams;

    type ProjectAssetTotal = {
      hostTotal: number;
      gameTotal: number;
      crossTotal: number;
      commonTotal: number;
    };

    type ProjectList = Common.PaginatingQueryRecord<Project & ProjectAssetTotal>;

    type Host = Common.CommonRecord<{
      name: string;
      ipv4: string;
      ipv6: string;
      vip: string;
      sshPort: number;
      zone: string;
      cloud: string;
      system: string;
      cores: number;
      dataDisk: number;
      mem: number;
      projectId: number;
    }>;

    type HostSearchParams = CommonType.RecordNullable<
      Omit<Api.AssetManage.Host, 'cores' | 'dataDisk' | 'mem' | 'sshPort'>
    > &
      Common.CommonSearchParams;

    type HostList = Common.PaginatingQueryRecord<
      Host &
        Omit<ProjectAssetTotal, 'hostTotal'> & {
          projectName: string;
        }
    >;
  }
  namespace CloudManage {
    type CloudProject = {
      name: string; // 项目名
      cloudPlatform: string; // 云平台
    };

    type UpdateCloudProjectReq = {
      id: number; // 云项目ID
    } & CloudProject;
  }
  namespace OpsManage {
    // 1 运行中 2 停服 3 已合服 4 操作中
    type GameStatus = 1 | 2 | 3 | 4;
    // 1 游服 2 跨服 3 公共服  ...后续有需要再加
    type GameType = 1 | 2 | 3;
    type Game = {
      id: number;
      type: GameType;
      status: GameStatus;
      lbName: string;
      lbListenerPort: number;
      serverPort: number;
      projectName: string;
      hostName: string;
      ipv4: string;
      projectId: number;
      hostId: number;
      crossId: number;
      commonId: number;
    };

    type GameSearchParams = CommonType.RecordNullable<
      Pick<Api.OpsManage.Game, 'id' | 'type' | 'status' | 'projectId' | 'hostName' | 'ipv4' | 'crossId' | 'commonId'>
    > &
      Common.CommonSearchParams;

    type GameList = Common.PaginatingQueryRecord<Game>;

    type Template = Common.CommonRecord<{
      name: string;
      content: string;
      projectId: number;
    }>;

    type TemplateSearchParams = CommonType.RecordNullable<Omit<Api.OpsManage.Template, 'content'>> &
      Common.CommonSearchParams;

    type TemplateList = Common.PaginatingQueryRecord<
      Template & {
        projectName: string;
      }
    >;

    type BindTemplateParam = {
      templateId: number;
      paramIds: number[];
    };

    type ParamTemplate = Common.CommonRecord<{
      keyword: string;
      variable: string;
    }>;

    type ParamTemplateSearchParams = CommonType.RecordNullable<Omit<Api.OpsManage.ParamTemplate, 'variable'>> &
      Common.CommonSearchParams;

    type ParamTemplateList = Common.PaginatingQueryRecord<ParamTemplate>;

    type Task = Common.CommonRecord<{
      name: string;
      checkTemplateId: number; // 被执行的运维检测脚本的模板，返回的打印信息是用于给运营审批查看的，没有则跳过检查
      templateIds: number[]; // 默认执行的运维脚本模板id并排好执行顺序
      auditors: number[]; // 默认的审批人
      hostId: number;
      hostName: string;
      isIntranet: boolean; // 是否走内网执行
      isConcurrent: boolean; // 是否不按顺序执行，而是并发执行
      projectId: number;
      projectName: string;
    }>;

    type TaskSearchParams = CommonType.RecordNullable<
      Pick<Api.OpsManage.Task, 'id' | 'name' | 'projectId' | 'status'>
    > &
      Common.CommonSearchParams;

    type TaskList = Common.PaginatingQueryRecord<
      Task & {
        projectName: string;
      }
    >;

    interface SubmitTask {
      taskId: number;
      execContent: string;
      checkResponse: string;
      templateIds: number[]; // 执行的运维脚本模板id并排好执行顺序,这里之所以有是因为任务里的默认模板排序是可选的
      auditors: number[]; // 审批人，这里之所以有是因为任务里的默认审批人是可选的
      submitter: number;
      execTime: number; // 指定执行时间(不选默认审批完或者没有审批人就立即执行)
    }

    type TaskStatus = 0 | 1 | 2 | 3 | 4;

    type TaskLogStepStatus = {
      command: string;
      startTime: string;
      endTime: string;
      status: TaskStatus;
      response: string;
      sshResponseStatus: number;
    };

    type TaskLog = Common.CommonRecord<{
      startTime: string;
      endTime: string;
      name: string;
      hostIp: string;
      execContext: string;
      checkResponse: string;
      commands: string[];
      stepStatus: TaskLogStepStatus[];
      status: TaskStatus;
      auditors: number[];
      auditorNames: string[];
      pendingAuditors: number[];
      pendingAuditorNames: string[];
      rejectAuditor: number;
      rejectAuditorName: string;
      projectName: string;
      projectId: number;
      submitter: number;
      submitterName: string;
      execTime: string;
    }>;

    type TaskLogSearchParams = CommonType.RecordNullable<
      Pick<Api.OpsManage.TaskLog, 'id' | 'name' | 'status' | 'projectId'> & {
        username: string;
      }
    > &
      Common.CommonSearchParams;

    type TaskLogList = Common.PaginatingQueryRecord<TaskLog>;

    type ApproveOpsTaskReq = {
      id: number;
      isAllow: boolean;
    };

    type GetUserTaskPendingReq = CommonType.RecordNullable<{
      taskName: string;
      projectId: number;
      status: number;
    }> &
      Common.CommonSearchParams;

    type TaskRealTimeLog = TaskLogStepStatus & {
      name: string;
      submitterName: string;
      children?: TaskLogStepStatus[];
    };
  }
}
