/** The global namespace for the app */
declare namespace App {
  /** Theme namespace */
  namespace Theme {
    type ColorPaletteNumber = import('@sa/color').ColorPaletteNumber;

    /** Theme token */
    type ThemeToken = {
      colors: ThemeTokenColor;
      boxShadow: {
        header: string;
        sider: string;
        tab: string;
      };
    };

    /** Theme setting */
    interface ThemeSetting {
      /** Theme scheme */
      themeScheme: UnionKey.ThemeScheme;
      /** grayscale mode */
      grayscale: boolean;
      /** Whether to recommend color */
      recommendColor: boolean;
      /** Theme color */
      themeColor: string;
      /** Other color */
      otherColor: OtherColor;
      /** Whether info color is followed by the primary color */
      isInfoFollowPrimary: boolean;
      /** Layout */
      layout: {
        /** Layout mode */
        mode: UnionKey.ThemeLayoutMode;
        /** Scroll mode */
        scrollMode: UnionKey.ThemeScrollMode;
      };
      /** Page */
      page: {
        /** Whether to show the page transition */
        animate: boolean;
        /** Page animate mode */
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      /** Header */
      header: {
        /** Header height */
        height: number;
        /** Header breadcrumb */
        breadcrumb: {
          /** Whether to show the breadcrumb */
          visible: boolean;
          /** Whether to show the breadcrumb icon */
          showIcon: boolean;
        };
      };
      /** Tab */
      tab: {
        /** Whether to show the tab */
        visible: boolean;
        /**
         * Whether to cache the tab
         *
         * If cache, the tabs will get from the local storage when the page is refreshed
         */
        cache: boolean;
        /** Tab height */
        height: number;
        /** Tab mode */
        mode: UnionKey.ThemeTabMode;
      };
      /** Fixed header and tab */
      fixedHeaderAndTab: boolean;
      /** Sider */
      sider: {
        /** Inverted sider */
        inverted: boolean;
        /** Sider width */
        width: number;
        /** Collapsed sider width */
        collapsedWidth: number;
        /** Sider width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixWidth: number;
        /** Collapsed sider width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixCollapsedWidth: number;
        /** Child menu width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixChildMenuWidth: number;
      };
      /** Footer */
      footer: {
        /** Whether to show the footer */
        visible: boolean;
        /** Whether fixed the footer */
        fixed: boolean;
        /** Footer height */
        height: number;
        /** Whether float the footer to the right when the layout is 'horizontal-mix' */
        right: boolean;
      };
    }

    interface OtherColor {
      info: string;
      success: string;
      warning: string;
      error: string;
    }

    interface ThemeColor extends OtherColor {
      primary: string;
    }

    type ThemeColorKey = keyof ThemeColor;

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    };

    type BaseToken = Record<string, Record<string, string>>;

    interface ThemeTokenColor extends ThemePaletteColor {
      nprogress: string;
      container: string;
      layout: string;
      inverted: string;
      base_text: string;
      [key: string]: string;
    }
  }

  /** Global namespace */
  namespace Global {
    type VNode = import('vue').VNode;
    type RouteLocationNormalizedLoaded = import('vue-router').RouteLocationNormalizedLoaded;
    type RouteKey = import('@elegant-router/types').RouteKey;
    type RouteMap = import('@elegant-router/types').RouteMap;
    type routePath = import('@elegant-router/types').RoutePath;
    type LastLevelRouteKey = import('@elegant-router/types').LastLevelRouteKey;

    /** The global header props */
    interface HeaderProps {
      /** Whether to show the logo */
      showLogo?: boolean;
      /** Whether to show the menu toggler */
      showMenuToggler?: boolean;
      /** Whether to show the menu */
      showMenu?: boolean;
    }

    /** The global menu */
    interface Menu {
      /**
       * The menu key
       *
       * Equal to the route key
       */
      key: string;
      /** The menu label */
      label: string;
      /** The menu i18n key */
      i18nKey?: I18n.I18nKey | null;
      /** The route key */
      routeKey: RouteKey;
      /** The route path */
      routePath: routePath;
      /** The menu icon */
      icon?: () => VNode;
      /** The menu children */
      children?: Menu[];
    }

    type Breadcrumb = Omit<Menu, 'children'> & {
      options?: Breadcrumb[];
    };

    /** Tab route */
    type TabRoute = Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> &
      Partial<Pick<RouteLocationNormalizedLoaded, 'fullPath' | 'query' | 'matched'>>;

    /** The global tab */
    type Tab = {
      /** The tab id */
      id: string;
      /** The tab label */
      label: string;
      /**
       * The new tab label
       *
       * If set, the tab label will be replaced by this value
       */
      newLabel?: string;
      /**
       * The old tab label
       *
       * when reset the tab label, the tab label will be replaced by this value
       */
      oldLabel?: string;
      /** The tab route key */
      routeKey: LastLevelRouteKey;
      /** The tab route path */
      routePath: RouteMap[LastLevelRouteKey];
      /** The tab route full path */
      fullPath: string;
      /** The tab fixed index */
      fixedIndex?: number | null;
      /**
       * Tab icon
       *
       * Iconify icon
       */
      icon?: string;
      /**
       * Tab local icon
       *
       * Local icon
       */
      localIcon?: string;
      /** I18n key */
      i18nKey?: I18n.I18nKey | null;
    };

    /** Form rule */
    type FormRule = import('naive-ui').FormItemRule;

    /** The global dropdown key */
    type DropdownKey = 'closeCurrent' | 'closeOther' | 'closeLeft' | 'closeRight' | 'closeAll';
  }

  /**
   * I18n namespace
   *
   * Locales type
   */
  namespace I18n {
    type RouteKey = import('@elegant-router/types').RouteKey;

    type LangType = 'en-US' | 'zh-CN';

    type LangOption = {
      label: string;
      key: LangType;
    };

    type I18nRouteKey = Exclude<RouteKey, 'root' | 'not-found'>;

    type FormMsg = {
      required: string;
      invalid: string;
    };

    type Schema = {
      system: {
        title: string;
        updateTitle: string;
        updateContent: string;
        updateConfirm: string;
        updateCancel: string;
      };
      common: {
        action: string;
        add: string;
        addSuccess: string;
        backToHome: string;
        batchDelete: string;
        cancel: string;
        close: string;
        check: string;
        expandColumn: string;
        columnSetting: string;
        config: string;
        confirm: string;
        delete: string;
        deleteSuccess: string;
        confirmOperation: string;
        confirmDelete: string;
        edit: string;
        error: string;
        invalidId: string;
        index: string;
        id: string;
        keywordSearch: string;
        logout: string;
        logoutMaskToeknFailed: string;
        logoutConfirm: string;
        lookForward: string;
        modify: string;
        detail: string;
        modifySuccess: string;
        noData: string;
        operate: string;
        cloudOperate: string;
        pleaseCheckValue: string;
        refresh: string;
        reset: string;
        search: string;
        switch: string;
        tip: string;
        trigger: string;
        update: string;
        updateSuccess: string;
        userCenter: string;
        yesOrNo: {
          yes: string;
          no: string;
        };
        nextStep: string;
        previousStep: string;
        show: string;
        allow: string;
        reject: string;
        success: string;
      };
      request: {
        logout: string;
        logoutMsg: string;
        logoutWithModal: string;
        logoutWithModalMsg: string;
        refreshToken: string;
        tokenExpired: string;
        error: string;
      };
      theme: {
        themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
        grayscale: string;
        layoutMode: { title: string } & Record<UnionKey.ThemeLayoutMode, string>;
        recommendColor: string;
        recommendColorDesc: string;
        themeColor: {
          title: string;
          followPrimary: string;
        } & Theme.ThemeColor;
        scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
        page: {
          animate: string;
          mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
        };
        fixedHeaderAndTab: string;
        header: {
          height: string;
          breadcrumb: {
            visible: string;
            showIcon: string;
          };
        };
        tab: {
          visible: string;
          cache: string;
          height: string;
          mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
        };
        sider: {
          inverted: string;
          width: string;
          collapsedWidth: string;
          mixWidth: string;
          mixCollapsedWidth: string;
          mixChildMenuWidth: string;
        };
        footer: {
          visible: string;
          fixed: string;
          height: string;
          right: string;
        };
        themeDrawerTitle: string;
        pageFunTitle: string;
        configOperation: {
          copyConfig: string;
          copySuccessMsg: string;
          resetConfig: string;
          resetSuccessMsg: string;
        };
      };
      route: Record<I18nRouteKey, string>;
      page: {
        login: {
          common: {
            loginOrRegister: string;
            usernamePlaceholder: string;
            phonePlaceholder: string;
            codePlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            codeLogin: string;
            confirm: string;
            back: string;
            validateSuccess: string;
            loginSuccess: string;
            welcomeBack: string;
          };
          pwdLogin: {
            title: string;
            rememberMe: string;
            register: string;
            otherAccountLogin: string;
            otherLoginMode: string;
            superAdmin: string;
            admin: string;
            user: string;
          };
          codeLogin: {
            title: string;
            getCode: string;
            reGetCode: string;
            sendCodeSuccess: string;
            imageCodePlaceholder: string;
          };
          register: {
            title: string;
            agreement: string;
            protocol: string;
            policy: string;
          };
          resetPwd: {
            title: string;
            placeholder: string;
          };
          bindWeChat: {
            title: string;
          };
        };
        about: {
          title: string;
          introduction: string;
          projectInfo: {
            title: string;
            version: string;
            latestBuildTime: string;
            githubLink: string;
            previewLink: string;
          };
          prdDep: string;
          devDep: string;
        };
        home: {
          greeting: string;
          projectCount: string;
          hostCount: string;
          taskNeedApproveCount: string;
          taskRunningCount: string;
        };
        function: {
          tab: {
            tabOperate: {
              title: string;
              addTab: string;
              addTabDesc: string;
              closeTab: string;
              closeCurrentTab: string;
              closeAboutTab: string;
              addMultiTab: string;
              addMultiTabDesc1: string;
              addMultiTabDesc2: string;
            };
            tabTitle: {
              title: string;
              changeTitle: string;
              change: string;
              resetTitle: string;
              reset: string;
            };
          };
          multiTab: {
            routeParam: string;
            backTab: string;
          };
          toggleAuth: {
            toggleAccount: string;
            authHook: string;
            superAdminVisible: string;
            adminVisible: string;
            adminOrUserVisible: string;
          };
          request: {
            repeatedErrorOccurOnce: string;
            repeatedError: string;
            repeatedErrorMsg1: string;
            repeatedErrorMsg2: string;
          };
        };
        manage: {
          common: {
            status: {
              enable: string;
              disable: string;
            };
          };
          role: {
            title: string;
            roleName: string;
            roleCode: string;
            roleStatus: string;
            roleDesc: string;
            form: {
              roleName: string;
              roleCode: string;
              roleStatus: string;
              roleDesc: string;
            };
            addRole: string;
            editRole: string;
            menuAuth: string;
            buttonAuth: string;
            apiAuth: string;
            projectAuth: string;
          };
          user: {
            title: string;
            username: string;
            userGender: string;
            nickname: string;
            userPhone: string;
            userEmail: string;
            userStatus: string;
            userRole: string;
            password: string;
            form: {
              username: string;
              userGender: string;
              nickname: string;
              userPhone: string;
              userEmail: string;
              userStatus: string;
              userRole: string;
            };
            addUser: string;
            editUser: string;
            gender: {
              male: string;
              female: string;
            };
          };
          userRecord: {
            title: string;
            createdAt: string;
            ip: string;
            method: string;
            path: string;
            agent: string;
            body: string;
            userId: string;
            username: string;
            status: string;
            latency: string;
            resp: string;
            date: string;
            form: {
              username: string;
              ip: string;
              date: string;
              method: string;
              status: string;
            };
          };
          api: {
            path: string;
            method: string;
            apiGroup: string;
            description: string;
            form: {
              path: string;
              method: string;
              apiGroup: string;
              description: string;
              tip: {
                apiGroup: string;
                path: string;
              };
            };
            search: {
              apiGroup: string;
            };
            addApi: string;
            addChildApi: string;
            editApi: string;
          };
          menu: {
            home: string;
            title: string;
            parentId: string;
            menuType: string;
            menuName: string;
            routeName: string;
            routePath: string;
            pathParam: string;
            layout: string;
            page: string;
            i18nKey: string;
            icon: string;
            localIcon: string;
            iconTypeTitle: string;
            order: string;
            constant: string;
            keepAlive: string;
            href: string;
            hideInMenu: string;
            activeMenu: string;
            multiTab: string;
            fixedIndexInTab: string;
            query: string;
            button: string;
            props: string;
            assignProps: string;
            buttonCode: string;
            buttonDesc: string;
            menuStatus: string;
            form: {
              home: string;
              menuType: string;
              menuName: string;
              routeName: string;
              routePath: string;
              pathParam: string;
              layout: string;
              page: string;
              i18nKey: string;
              icon: string;
              localIcon: string;
              order: string;
              keepAlive: string;
              href: string;
              hideInMenu: string;
              activeMenu: string;
              multiTab: string;
              fixedInTab: string;
              fixedIndexInTab: string;
              queryKey: string;
              queryValue: string;
              button: string;
              buttonCode: string;
              buttonDesc: string;
              propsKey: string;
              propsValue: string;
              menuStatus: string;
            };
            addMenu: string;
            editMenu: string;
            addChildMenu: string;
            type: {
              directory: string;
              menu: string;
            };
            iconType: {
              iconify: string;
              local: string;
            };
          };
        };
        asset: {
          project: {
            title: string;
            name: string;
            backendVersion: string;
            frontendVersion: string;
            gameRange: string;
            crossRange: string;
            commonRange: string;
            oneGameMem: string;
            oneCrossMem: string;
            oneCommonMem: string;
            cloudPlatform: string;
            hostTotal: string;
            gameTotal: string;
            crossTotal: string;
            commonTotal: string;
            form: {
              name: string;
              backendVersion: string;
              frontendVersion: string;
              gameRange: string;
              crossRange: string;
              commonRange: string;
              oneGameMem: string;
              oneCrossMem: string;
              oneCommonMem: string;
              cloudPlatform: string;
            };
            addProject: string;
            editProject: string;
            search: {
              name: string;
            };
            cloudOperate: {
              create: string;
              update: string;
            };
          };
          host: {
            title: string;
            name: string;
            ipv4: string;
            ipv6: string;
            vip: string;
            sshPort: string;
            projectName: string;
            zone: string;
            cloud: string;
            system: string;
            cores: string;
            dataDisk: string;
            mem: string;
            gameTotal: string;
            crossTotal: string;
            commonTotal: string;
            buyHost: string;
            buyHostCount: string;
            webSSH: string;
            webSSHTips1: string;
            webSSHTips2: string;
            form: {
              name: string;
              ipv4: string;
              ipv6: string;
              vip: string;
              isIntranet: string;
              sshPort: string;
              projectName: string;
              zone: string;
              cloud: string;
              system: string;
              cores: string;
              dataDisk: string;
              mem: string;
              buyHostCount: string;
            };
            addHost: string;
            editHost: string;
            search: {
              name: string;
              ipv4: string;
              ipv6: string;
              vip: string;
              projectName: string;
              zone: string;
              cloud: string;
              system: string;
            };
          };
        };
        opsManage: {
          game: {
            title: string;
            id: string;
            type: string;
            status: string;
            lbName: string;
            lbListenerPort: string;
            serverPort: string;
            projectName: string;
            hostName: string;
            hostIpv4: string;
            crossId: string;
            commonId: string;
            addGame: string;
            editGame: string;
            form: {
              id: string;
              type: string;
              status: string;
              lbName: string;
              lbListenerPort: string;
              serverPort: string;
              projectName: string;
              hostIp: string;
              crossId: string;
              commonId: string;
            };
            search: {
              id: string;
              type: string;
              status: string;
              projectName: string;
              hostName: string;
              crossId: string;
              commonId: string;
            };
            statusOption: {
              running: string;
              stopped: string;
              merged: string;
              operating: string;
            };
            typeOption: {
              game: string;
              cross: string;
              common: string;
            };
          };
          template: {
            title: string;
            name: string;
            content: string;
            projectId: string;
            addTemplate: string;
            editTemplate: string;
            paramBind: string;
            form: {
              name: string;
              content: string;
              projectId: string;
            };
            search: {
              name: string;
              projectId: string;
            };
          };
          paramTemplate: {
            title: string;
            keyword: string;
            variable: string;
            addParamTemplate: string;
            editParamTemplate: string;
            form: {
              keyword: string;
              variable: string;
            };
            search: {
              keyword: string;
            };
          };
          task: {
            title: string;
            name: string;
            checkTemplate: string;
            template: string;
            auditor: string;
            host: string;
            isIntranet: string;
            isConcurrent: string;
            project: string;
            addTask: string;
            editTask: string;
            submit: string;
            submitTitle: string;
            submitAuditor: string;
            execContent: string;
            checkResponse: string;
            command: string;
            taskPendingApproval: string;
            approve: string;
            execTime: string;
            form: {
              name: string;
              checkTemplate: string;
              template: string;
              auditor: string;
              host: string;
              project: string;
              execContent: string;
              checkResponse: string;
              submitAuditor: string;
              submitSuccess: string;
              execTime: string;
              isImmediate: string;
            };
            search: {
              name: string;
              project: string;
            };
            error: {
              radioValueError: string;
            };
          };
          taskLog: {
            title: string;
            startTime: string;
            endTime: string;
            name: string;
            hostIp: string;
            execContext: string;
            checkResponse: string;
            commands: string;
            stepStatus: string;
            status: string;
            sshResponseStatus: string;
            sshResponse: string;
            auditors: string;
            pendingAuditors: string;
            rejectAuditor: string;
            project: string;
            submitter: string;
            realTimeLog: string;
            taskStatus: {
              waiting: string;
              running: string;
              success: string;
              fail: string;
              reject: string;
            };
            form: {
              name: string;
              project: string;
              submitter: string;
            };
            search: {
              name: string;
              project: string;
              status: string;
            };
          };
        };
      };
      form: {
        required: string;
        username: FormMsg;
        phone: FormMsg;
        pwd: FormMsg;
        confirmPwd: FormMsg;
        code: FormMsg;
        email: FormMsg;
        ipv4: FormMsg;
        ipv6: FormMsg;
        vip: FormMsg;
      };
      dropdown: Record<Global.DropdownKey, string>;
      icon: {
        themeConfig: string;
        themeSchema: string;
        lang: string;
        fullscreen: string;
        fullscreenExit: string;
        reload: string;
        collapse: string;
        expand: string;
        pin: string;
        unpin: string;
      };
      datatable: {
        itemCount: string;
      };
    };

    type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never;

    type I18nKey = GetI18nKey<Schema>;

    type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>;

    interface $T {
      (key: I18nKey): string;
      (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], plural: number): string;
      (key: I18nKey, list: unknown[], defaultMsg: string): string;
      (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, named: Record<string, unknown>, plural: number): string;
      (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
    }
  }

  /** Service namespace */
  namespace Service {
    /** Other baseURL key */
    type OtherBaseURLKey = 'demo';

    interface ServiceConfigItem {
      /** The backend service base url */
      baseURL: string;
      /** The proxy pattern of the backend service base url */
      proxyPattern: string;
    }

    interface OtherServiceConfigItem extends ServiceConfigItem {
      key: OtherBaseURLKey;
    }

    /** The backend service config */
    interface ServiceConfig extends ServiceConfigItem {
      /** Other backend service config */
      other: OtherServiceConfigItem[];
    }

    interface SimpleServiceConfig extends Pick<ServiceConfigItem, 'baseURL'> {
      other: Record<OtherBaseURLKey, string>;
    }

    /** The backend service response data */
    type Response<T = unknown> = {
      /** The backend service response code */
      code: string;
      /** The backend service response message */
      msg: string;
      /** The backend service response data */
      data: T;
    };

    /** The demo backend service response data */
    type DemoResponse<T = unknown> = {
      /** The backend service response code */
      status: string;
      /** The backend service response message */
      message: string;
      /** The backend service response data */
      result: T;
    };
  }
}
