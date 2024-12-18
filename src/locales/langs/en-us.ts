const local: App.I18n.Schema = {
  system: {
    title: 'FreeOps Admin',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    add: 'Add',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    confirmOperation: 'Are you sure you want to perform this operation?',
    confirmDelete: 'Are you sure you want to delete?',
    edit: 'Edit',
    error: 'Error',
    invalidId: 'Invalid ID',
    index: 'Index',
    id: 'ID',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutMaskToeknFailed: 'Backend failed to mask the token.',
    logoutConfirm: 'Are you sure you want to log out?',
    lookForward: 'Coming soon',
    modify: 'Modify',
    detail: 'Detail',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    cloudOperate: 'Cloud Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    userCenter: 'User Center',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    },
    nextStep: 'Next',
    previousStep: 'Previous',
    show: 'Show',
    allow: 'Allow',
    reject: 'Reject',
    success: 'Success'
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired',
    error: 'Request backend error'
  },
  theme: {
    themeSchema: {
      title: 'Theme Schema',
      light: 'Light',
      dark: 'Dark',
      auto: 'Follow System'
    },
    grayscale: 'Grayscale',
    layoutMode: {
      title: 'Layout Mode',
      vertical: 'Vertical Menu Mode',
      horizontal: 'Horizontal Menu Mode',
      'vertical-mix': 'Vertical Mix Menu Mode',
      'horizontal-mix': 'Horizontal Mix menu Mode'
    },
    recommendColor: 'Apply Recommended Color Algorithm',
    recommendColorDesc: 'The recommended color algorithm refers to',
    themeColor: {
      title: 'Theme Color',
      primary: 'Primary',
      info: 'Info',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      followPrimary: 'Follow Primary'
    },
    scrollMode: {
      title: 'Scroll Mode',
      wrapper: 'Wrapper',
      content: 'Content'
    },
    page: {
      animate: 'Page Animate',
      mode: {
        title: 'Page Animate Mode',
        fade: 'Fade',
        'fade-slide': 'Slide',
        'fade-bottom': 'Fade Zoom',
        'fade-scale': 'Fade Scale',
        'zoom-fade': 'Zoom Fade',
        'zoom-out': 'Zoom Out',
        none: 'None'
      }
    },
    fixedHeaderAndTab: 'Fixed Header And Tab',
    header: {
      height: 'Header Height',
      breadcrumb: {
        visible: 'Breadcrumb Visible',
        showIcon: 'Breadcrumb Icon Visible'
      }
    },
    tab: {
      visible: 'Tab Visible',
      cache: 'Tab Cache',
      height: 'Tab Height',
      mode: {
        title: 'Tab Mode',
        chrome: 'Chrome',
        button: 'Button'
      }
    },
    sider: {
      inverted: 'Dark Sider',
      width: 'Sider Width',
      collapsedWidth: 'Sider Collapsed Width',
      mixWidth: 'Mix Sider Width',
      mixCollapsedWidth: 'Mix Sider Collapse Width',
      mixChildMenuWidth: 'Mix Child Menu Width'
    },
    footer: {
      visible: 'Footer Visible',
      fixed: 'Fixed Footer',
      height: 'Footer Height',
      right: 'Right Footer'
    },
    themeDrawerTitle: 'Theme Configuration',
    pageFunTitle: 'Page Function',
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    document: 'Document',
    document_project: 'Project Document(Internal Link: github does not allow)',
    'document_project-link': 'Project Document(External Link)',
    document_vue: 'Vue Document',
    document_vite: 'Vite Document',
    document_unocss: 'UnoCSS Document',
    document_naive: 'Naive UI Document',
    document_antd: 'Ant Design Vue Document',
    manage_api: 'API Manage',
    'user-center': 'User Center',
    about: 'About',
    function: 'System Function',
    function_tab: 'Tab',
    'function_multi-tab': 'Multi Tab',
    'function_hide-child': 'Hide Child',
    'function_hide-child_one': 'Hide Child',
    'function_hide-child_two': 'Two',
    'function_hide-child_three': 'Three',
    function_request: 'Request',
    'function_toggle-auth': 'Toggle Auth',
    'function_super-page': 'Super Admin Visible',
    manage: 'System Manage',
    asset: 'Asset Manage',
    manage_user: 'User Manage',
    'manage_user-detail': 'User Detail',
    manage_role: 'Role Manage',
    'manage_user-record': 'User Record',
    manage_menu: 'Menu Manage',
    'multi-menu': 'Multi Menu',
    'multi-menu_first': 'Menu One',
    'multi-menu_first_child': 'Menu One Child',
    'multi-menu_second': 'Menu Two',
    'multi-menu_second_child': 'Menu Two Child',
    'multi-menu_second_child_home': 'Menu Two Child Home',
    asset_project: 'Project Asset',
    asset_host: 'Host Asset',
    'ops-manage': 'Ops Manage',
    'ops-manage_game': 'Game Manage',
    'ops-manage_template': 'Template Manage',
    'ops-manage_param-template': 'Param Template Manage',
    'ops-manage_task': 'Task Manage',
    'ops-manage_approve-task': 'Approve Task',
    'ops-manage_task-log': 'Task Log',
    exception: 'Exception',
    exception_403: '403',
    exception_404: '404',
    exception_500: '500'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        usernamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {nickname} !'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember me',
        register: 'Register',
        otherAccountLogin: 'Other Account Login',
        otherLoginMode: 'Other Login Mode',
        superAdmin: 'Super Admin',
        admin: 'Admin',
        user: 'User'
      },
      codeLogin: {
        title: 'Verification Code Login',
        getCode: 'Get verification code',
        reGetCode: 'Reacquire after {time}s',
        sendCodeSuccess: 'Verification code sent successfully',
        imageCodePlaceholder: 'Please enter image verification code'
      },
      register: {
        title: 'Register',
        agreement: 'I have read and agree to',
        protocol: '《User Agreement》',
        policy: '《Privacy Policy》'
      },
      resetPwd: {
        title: 'Reset Password',
        placeholder:
          'Must contain 6-18 characters, including numbers and letters, and allow decimal points and underscores'
      },
      bindWeChat: {
        title: 'Bind WeChat'
      }
    },
    about: {
      title: 'About',
      introduction: `SoybeanAdmin is an elegant and powerful admin template, based on the latest front-end technology stack, including Vue3, Vite5, TypeScript, Pinia and UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. SoybeanAdmin provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.`,
      projectInfo: {
        title: 'Project Info',
        version: 'Version',
        latestBuildTime: 'Latest Build Time',
        githubLink: 'Github Link',
        previewLink: 'Preview Link'
      },
      prdDep: 'Production Dependency',
      devDep: 'Development Dependency'
    },
    home: {
      greeting: '{nickname}你好, 今天又是充满活力的一天!',
      projectCount: 'Project Count',
      hostCount: 'Host Count',
      taskNeedApproveCount: 'Task Need Approve Count',
      taskRunningCount: 'Task Running Count'
    },
    function: {
      tab: {
        tabOperate: {
          title: 'Tab Operation',
          addTab: 'Add Tab',
          addTabDesc: 'To about page',
          closeTab: 'Close Tab',
          closeCurrentTab: 'Close Current Tab',
          closeAboutTab: 'Close "About" Tab',
          addMultiTab: 'Add Multi Tab',
          addMultiTabDesc1: 'To MultiTab page',
          addMultiTabDesc2: 'To MultiTab page(with query params)'
        },
        tabTitle: {
          title: 'Tab Title',
          changeTitle: 'Change Title',
          change: 'Change',
          resetTitle: 'Reset Title',
          reset: 'Reset'
        }
      },
      multiTab: {
        routeParam: 'Route Param',
        backTab: 'Back function_tab'
      },
      toggleAuth: {
        toggleAccount: 'Toggle Account',
        authHook: 'Auth Hook Function `hasAuth`',
        superAdminVisible: 'Super Admin Visible',
        adminVisible: 'Admin Visible',
        adminOrUserVisible: 'Admin and User Visible'
      },
      request: {
        repeatedErrorOccurOnce: 'Repeated Request Error Occurs Once',
        repeatedError: 'Repeated Request Error',
        repeatedErrorMsg1: 'Custom Request Error 1',
        repeatedErrorMsg2: 'Custom Request Error 2'
      }
    },
    manage: {
      common: {
        status: {
          enable: 'Enable',
          disable: 'Disable'
        }
      },
      role: {
        title: 'Role List',
        roleName: 'Role Name',
        roleCode: 'Role Code',
        roleStatus: 'Role Status',
        roleDesc: 'Role Description',
        menuAuth: 'Menu Auth',
        buttonAuth: 'Button Auth',
        apiAuth: 'Api Auth',
        projectAuth: 'Project Auth',
        form: {
          roleName: 'Please enter role name',
          roleCode: 'Please enter role code',
          roleStatus: 'Please select role status',
          roleDesc: 'Please enter role description'
        },
        addRole: 'Add Role',
        editRole: 'Edit Role'
      },
      user: {
        title: 'User List',
        username: 'User Name',
        userGender: 'Gender',
        nickname: 'Nick Name',
        userPhone: 'Phone Number',
        userEmail: 'Email',
        userStatus: 'User Status',
        userRole: 'User Role',
        password: 'Password',
        form: {
          username: 'Please enter user name',
          userGender: 'Please select gender',
          nickname: 'Please enter nick name',
          userPhone: 'Please enter phone number',
          userEmail: 'Please enter email',
          userStatus: 'Please select user status',
          userRole: 'Please select user role'
        },
        addUser: 'Add User',
        editUser: 'Edit User',
        gender: {
          male: 'Male',
          female: 'Female'
        }
      },
      userRecord: {
        title: 'User Operation Record',
        createdAt: 'Time',
        ip: 'IP',
        method: 'Method',
        path: 'Path',
        agent: 'User-Agent',
        body: 'Body',
        userId: 'UserID',
        username: 'Username',
        status: 'BackendCode',
        latency: 'Latency (nanoseconds)',
        resp: 'ResponseBody',
        date: 'Date',
        form: {
          username: 'Please enter username',
          ip: 'Please enter full IP',
          date: 'Please select date',
          method: 'Please select request method',
          status: 'Please select the range of backend return code'
        }
      },
      api: {
        path: 'API Path',
        method: 'Request Method',
        description: 'API Description',
        apiGroup: 'API Group',
        search: {
          apiGroup: 'Please enter the full API group'
        },
        form: {
          path: 'Please enter the API path',
          method: 'Please select the request method',
          description: 'Please enter the API description',
          apiGroup: 'Please enter the API group',
          tip: {
            apiGroup:
              'The new API directly input groups, and the parent directory of the group can be automatically generated, without creating a separate group',
            path: 'if the API is /user, just enter /user, do not write /user/'
          }
        },
        addApi: 'Add API',
        addChildApi: 'Add Child API',
        editApi: 'Edit API'
      },
      menu: {
        home: 'Home',
        title: 'Menu List',
        parentId: 'Parent ID',
        menuType: 'Menu Type',
        menuName: 'Menu Name',
        routeName: 'Route Name',
        routePath: 'Route Path',
        pathParam: 'Path Param',
        layout: 'Layout Component',
        page: 'Page Component',
        i18nKey: 'I18n Key',
        icon: 'Icon',
        localIcon: 'Local Icon',
        iconTypeTitle: 'Icon Type',
        order: 'Order',
        constant: 'Constant',
        keepAlive: 'Keep Alive',
        href: 'Href',
        hideInMenu: 'Hide In Menu',
        activeMenu: 'Active Menu',
        multiTab: 'Multi Tab',
        fixedIndexInTab: 'Fixed Index In Tab',
        query: 'Query Params',
        button: 'Create Button(If modified, rebind the role)',
        props: 'Props',
        assignProps: 'assignProps(if null, Default path args)',
        buttonCode: 'Button Code',
        buttonDesc: 'Button Desc',
        menuStatus: 'Menu Status',
        form: {
          home: 'Please select home',
          menuType: 'Please select menu type',
          menuName: 'Please enter menu name',
          routeName: 'Please enter route name',
          routePath: 'Please enter route path',
          pathParam: 'Please enter path param',
          page: 'Please select page component',
          layout: 'Please select layout component',
          i18nKey: 'Please enter i18n key',
          icon: 'Please enter iconify name',
          localIcon: 'Please enter local icon name',
          order: 'Please enter order',
          keepAlive: 'Please select whether to cache route',
          href: 'Please enter href',
          hideInMenu: 'Please select whether to hide menu',
          activeMenu: 'Please select route name of the highlighted menu',
          multiTab: 'Please select whether to support multiple tabs',
          fixedInTab: 'Please select whether to fix in the tab',
          fixedIndexInTab: 'Please enter the index fixed in the tab',
          queryKey: 'Please enter route parameter Key',
          queryValue: 'Please enter route parameter Value',
          button: 'Please select whether it is a button',
          buttonCode: 'Please enter button code',
          buttonDesc: 'Please enter button description',
          propsKey: 'Please enter the propsKey',
          propsValue: 'Please enter the propsValue',
          menuStatus: 'Please select menu status'
        },
        addMenu: 'Add Menu',
        editMenu: 'Edit Menu',
        addChildMenu: 'Add Child Menu',
        type: {
          directory: 'Directory',
          menu: 'Menu'
        },
        iconType: {
          iconify: 'Iconify Icon',
          local: 'Local Icon'
        }
      }
    },
    asset: {
      project: {
        title: 'Project List',
        name: 'Project Name',
        backendVersion: 'Backend Version',
        frontendVersion: 'Frontend Version',
        gameRange: 'Game ID Range',
        crossRange: 'Cross ID Range',
        commonRange: 'Common ID Range',
        oneGameMem: 'One Game Max Memory(G)',
        oneCrossMem: 'One Cross Max Memory(G)',
        oneCommonMem: 'One Common Max Memory(G)',
        cloudPlatform: 'Cloud Platform',
        hostTotal: 'Host Total',
        gameTotal: 'Game Total',
        crossTotal: 'Cross Total',
        commonTotal: 'Common Total',
        form: {
          name: 'Please enter project name',
          backendVersion: 'Please enter backend version',
          frontendVersion: 'Please enter frontend version',
          gameRange: 'Please enter game ID range',
          crossRange: 'Please enter cross ID range',
          commonRange: 'Please enter common ID range',
          oneGameMem: 'Please enter max memory(FLOAT)',
          oneCrossMem: 'Please enter max memory(FLOAT)',
          oneCommonMem: 'Please enter max memory(FLOAT)',
          cloudPlatform: 'Please select cloud platform'
        },
        addProject: 'Add Project',
        editProject: 'Edit Project',
        search: {
          name: 'Please enter project name'
        },
        cloudOperate: {
          create: 'Create Cloud Project',
          update: 'Update Cloud Project'
        }
      },
      host: {
        title: 'Host List',
        name: 'Host Name',
        ipv4: 'IPv4',
        ipv6: 'IPv6',
        vip: 'Internal IP',
        sshPort: 'SSH Port',
        projectName: 'Project Name',
        zone: 'Zone',
        cloud: 'Cloud Platform',
        system: 'Operating System',
        cores: 'CPU Cores',
        dataDisk: 'Data Disk (G)',
        mem: 'Memory (G)',
        gameTotal: 'Host Game Count',
        crossTotal: 'Host Cross Count',
        commonTotal: 'Host Common Count',
        buyHost: 'Buy Host',
        buyHostCount: 'Buy Host Count',
        webSSH: 'webSSH',
        webSSHTips1:
          'If the development user does not have a personal key or uses jumpserver, the user and key in the freeOPS configuration file are used by default (only ls, less permissions are provided, which is more secure. Here, all users are provided for display, so only cd permissions are provided)',
        webSSHTips2:
          'If you log in with a key, you can change it to automatically obtain the key field of the current user (the backend provides an interface to write the key) to prevent other users from impersonating',
        form: {
          name: 'Please enter host name',
          ipv4: 'Please enter IPv4',
          ipv6: 'Please enter IPv6',
          vip: 'Please enter internal IP',
          isIntranet:
            'If it is a channel and a management machine starts the service, the intranet can fill in 127.0.0.1',
          sshPort: 'Please enter SSH port',
          projectName: 'Please select project name',
          zone: 'Please enter zone',
          cloud: 'Please select cloud platform',
          system: 'Please enter operating system',
          cores: 'Please enter CPU cores',
          dataDisk: 'Please enter data disk (G)',
          mem: 'Please enter memory (G)',
          buyHostCount: 'Please enter the number of hosts to buy'
        },
        addHost: 'Add Host',
        editHost: 'Edit Host',
        search: {
          name: 'Please enter Host name',
          ipv4: 'Please enter IPv4',
          ipv6: 'Please enter IPv6',
          vip: 'Please enter internal IP',
          projectName: 'Please enter project name',
          zone: 'Please enter zone',
          cloud: 'Please select cloud platform',
          system: 'Please enter operating system'
        }
      }
    },
    opsManage: {
      game: {
        title: 'Game List',
        id: 'Game ID',
        type: 'Game Type',
        status: 'Game Status',
        lbName: 'LB Name',
        lbListenerPort: 'LB Listener Port',
        serverPort: 'Game Server Port',
        projectName: 'Project Name',
        hostName: 'Host Name',
        hostIpv4: 'Host IPv4',
        crossId: 'Cross ID',
        commonId: 'Common ID',
        addGame: 'Add Game',
        editGame: 'Edit Game',
        form: {
          id: 'Please enter game ID',
          type: 'Please select game type',
          status: 'Please select game status',
          lbName: 'Please enter LB name',
          lbListenerPort: 'Please enter LB listener port',
          serverPort: 'Please enter game server port',
          projectName: 'Please select project name',
          hostIp: 'Please select host IP',
          crossId: 'Please enter cross ID',
          commonId: 'Please enter common ID'
        },
        search: {
          id: 'Please enter game ID',
          type: 'Please select game type',
          status: 'Please select game status',
          projectName: 'Please enter project name',
          hostName: 'Please enter host name',
          crossId: 'Please enter cross ID',
          commonId: 'Please enter common ID'
        },
        statusOption: {
          running: 'Running',
          stopped: 'Stopped',
          merged: 'Merged',
          operating: 'Operating'
        },
        typeOption: {
          game: 'Game',
          cross: 'Cross',
          common: 'Common'
        }
      },
      template: {
        title: 'Template List',
        name: 'Template Name',
        content: 'Template Content',
        projectId: 'Project Name',
        addTemplate: 'Add Template',
        editTemplate: 'Edit Template',
        paramBind: 'Param Template Relation',
        form: {
          name: 'Please enter template name',
          content: 'Please enter template content',
          projectId: 'Please select project name'
        },
        search: {
          name: 'Please enter template name',
          projectId: 'Please enter project ID'
        }
      },
      paramTemplate: {
        title: 'Param Template List',
        keyword: 'Keyword',
        variable: 'Mapped Variable',
        addParamTemplate: 'Add Param Template',
        editParamTemplate: 'Edit Param Template',
        form: {
          keyword: 'Please enter keyword',
          variable: 'Please enter mapped variable'
        },
        search: {
          keyword: 'Please enter keyword'
        }
      },
      task: {
        title: 'Task List',
        name: 'Task Name',
        checkTemplate: 'Check Template',
        template: 'Script Template(in order)',
        auditor: 'Default Auditor(can be multiple)',
        host: 'Execution Host',
        isIntranet: 'Intranet Execute',
        isConcurrent: 'Concurrent Execute',
        project: 'Project',
        addTask: 'Add Task',
        editTask: 'Edit Task',
        submit: 'Submit for exec',
        submitTitle: 'Submit Task',
        execContent: 'Exec Content',
        checkResponse: 'Check Response',
        submitAuditor: 'Auditor(can be multiple)',
        command: 'Command',
        taskPendingApproval: 'You have task pending approval',
        approve: 'Approve',
        form: {
          name: 'Please enter task name',
          checkTemplate: 'Please select check template',
          template: 'Please select script template in order',
          auditor: 'If not selected, it will be approved by default',
          host: 'Please select Execution host',
          project: 'Please select project',
          execContent: 'Parameter template keyword: mapped variable\nGameIds: 1_20\nAll server ids: 1_200',
          checkResponse: 'Response is empty, please check the log of the operation and maintenance check script',
          submitAuditor: 'Please select auditor',
          submitSuccess: 'Submit Success'
        },
        search: {
          name: 'Please enter task name',
          project: 'Please select project'
        },
        error: {
          radioValueError: 'There are radio options not selected'
        }
      },
      taskLog: {
        title: 'Task Log List',
        startTime: 'Exec start Time',
        endTime: 'Exec end Time',
        name: 'Task Name',
        hostIp: 'Host IP',
        execContext: 'Operation Execution Content Template',
        checkResponse: 'Check Response',
        commands: 'Commands',
        stepStatus: 'Step Status',
        status: 'Task Status',
        sshResponseStatus: 'SSH Response Status',
        sshResponse: 'SSH Response',
        auditors: 'Auditors',
        pendingAuditors: 'Pending Auditors',
        rejectAuditor: 'Reject Auditor',
        project: 'Project',
        submitter: 'Submitter',
        realTimeLog: 'Real Time Task Log',
        taskStatus: {
          waiting: 'Waiting',
          running: 'Running',
          success: 'Success',
          fail: 'Fail',
          reject: 'Reject'
        },
        form: {
          name: 'Please enter task name',
          project: 'Please select project',
          submitter: 'Please enter submitter username'
        },
        search: {
          name: 'Please select task',
          project: 'Please select project',
          status: 'Please select task status'
        }
      }
    }
  },
  form: {
    required: 'Cannot be empty',
    username: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Password format is incorrect, 6-18 characters, must contain numbers and letters'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    },
    ipv4: {
      required: 'Please enter ipv4',
      invalid: 'ipv4 format is incorrect'
    },
    ipv6: {
      required: 'Please enter ipv6',
      invalid: 'ipv6 format is incorrect'
    },
    vip: {
      required: 'Please enter virtual ip',
      invalid: 'virtual ip format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
