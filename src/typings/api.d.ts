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

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = 1 | 2;

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number;
      /** record status */
      status: EnableStatus | null;
    } & T;
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
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>;

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
      CommonSearchParams;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>;

    /** role bind req */
    interface RoleRelation {
      roleId: number;
      associationType: number; // 1: api 2: menu 3: button
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
      CommonSearchParams;

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
      CommonSearchParams;

    type UpdateButtonParams = {
      id?: number;
    } & Omit<Button, 'id'>;

    type ButtonSearchParams = CommonType.RecordNullable<{
      id?: number;
      code?: string;
      menuId?: number;
    }> &
      CommonSearchParams;

    type ApiModel = Common.CommonRecord<{
      path: string;
      method: string;
      apiGroup: string;
      description?: string;
      children?: ApiModel[];
    }>;

    type ApiList = Common.PaginatingQueryRecord<ApiModel>;

    type ApiSearchParams = CommonType.RecordNullable<Partial<Pick<Api.SystemManage.ApiModel, 'apiGroup' | 'id'>>> &
      CommonSearchParams;

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
      CommonSearchParams;

    interface UserRecordMonthsResponse {
      dates: string[];
    }

    type UserRecordList = Common.PaginatingQueryRecord<UserRecord>;
    interface UpdatePasswordParams {
      id: number;
      newPassword: string;
    }
  }
}
