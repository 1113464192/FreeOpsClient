const local: App.I18n.Schema = {
  system: {
    title: 'FreeOps 管理系统',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  common: {
    action: '操作',
    add: '新增',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    expandColumn: '展开列',
    columnSetting: '列设置',
    config: '配置',
    confirm: '确认',
    delete: '删除',
    deleteSuccess: '删除成功',
    confirmOperation: '确认操作吗？',
    confirmDelete: '确认删除吗？',
    edit: '编辑',
    error: '错误',
    invalidId: '无效ID',
    index: '序号',
    id: 'ID',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutMaskToeknFailed: '后端拉黑token失败',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    detail: '详情',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    cloudOperate: '云平台操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    updateSuccess: '更新成功',
    userCenter: '个人中心',
    yesOrNo: {
      yes: '是',
      no: '否'
    },
    nextStep: '下一步',
    previousStep: '上一步',
    show: '显示',
    allow: '允许',
    reject: '拒绝',
    success: '成功'
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期',
    error: '请求后端错误'
  },
  theme: {
    themeSchema: {
      title: '主题模式',
      light: '亮色模式',
      dark: '暗黑模式',
      auto: '跟随系统'
    },
    grayscale: '灰度模式',
    layoutMode: {
      title: '布局模式',
      vertical: '左侧菜单模式',
      'vertical-mix': '左侧菜单混合模式',
      horizontal: '顶部菜单模式',
      'horizontal-mix': '顶部菜单混合模式'
    },
    recommendColor: '应用推荐算法的颜色',
    recommendColorDesc: '推荐颜色的算法参照',
    themeColor: {
      title: '主题颜色',
      primary: '主色',
      info: '信息色',
      success: '成功色',
      warning: '警告色',
      error: '错误色',
      followPrimary: '跟随主色'
    },
    scrollMode: {
      title: '滚动模式',
      wrapper: '外层滚动',
      content: '主体滚动'
    },
    page: {
      animate: '页面切换动画',
      mode: {
        title: '页面切换动画类型',
        'fade-slide': '滑动',
        fade: '淡入淡出',
        'fade-bottom': '底部消退',
        'fade-scale': '缩放消退',
        'zoom-fade': '渐变',
        'zoom-out': '闪现',
        none: '无'
      }
    },
    fixedHeaderAndTab: '固定头部和标签栏',
    header: {
      height: '头部高度',
      breadcrumb: {
        visible: '显示面包屑',
        showIcon: '显示面包屑图标'
      }
    },
    tab: {
      visible: '显示标签栏',
      cache: '缓存标签页',
      height: '标签栏高度',
      mode: {
        title: '标签栏风格',
        chrome: '谷歌风格',
        button: '按钮风格'
      }
    },
    sider: {
      inverted: '深色侧边栏',
      width: '侧边栏宽度',
      collapsedWidth: '侧边栏折叠宽度',
      mixWidth: '混合布局侧边栏宽度',
      mixCollapsedWidth: '混合布局侧边栏折叠宽度',
      mixChildMenuWidth: '混合布局子菜单宽度'
    },
    footer: {
      visible: '显示底部',
      fixed: '固定底部',
      height: '底部高度',
      right: '底部局右'
    },
    themeDrawerTitle: '主题配置',
    pageFunTitle: '页面功能',
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    document: '文档',
    document_project: '项目文档(内链: github不允许)',
    'document_project-link': '项目文档(外链)',
    document_vue: 'Vue文档',
    document_vite: 'Vite文档',
    document_unocss: 'UnoCSS文档',
    document_naive: 'Naive UI文档',
    document_antd: 'Ant Design Vue文档',
    manage_api: 'API管理',
    'user-center': '个人中心',
    about: '关于',
    function: '系统功能',
    function_tab: '标签页',
    'function_multi-tab': '多标签页',
    'function_hide-child': '隐藏子菜单',
    'function_hide-child_one': '隐藏子菜单',
    'function_hide-child_two': '菜单二',
    'function_hide-child_three': '菜单三',
    function_request: '请求',
    'function_toggle-auth': '切换权限',
    'function_super-page': '超级管理员可见',
    manage: '系统管理',
    asset: '资产管理',
    manage_user: '用户管理',
    'manage_user-detail': '用户详情',
    manage_role: '角色管理',
    'manage_user-record': '用户操作记录',
    manage_menu: '菜单管理',
    'multi-menu': '多级菜单',
    'multi-menu_first': '菜单一',
    'multi-menu_first_child': '菜单一子菜单',
    'multi-menu_second': '菜单二',
    'multi-menu_second_child': '菜单二子菜单',
    'multi-menu_second_child_home': '菜单二子菜单首页',
    asset_project: '项目管理',
    asset_host: '服务器管理',
    'ops-manage': '运维管理',
    'ops-manage_game': '游戏服管理',
    'ops-manage_template': '模板管理',
    'ops-manage_param-template': '参数模板管理',
    'ops-manage_task': '任务管理',
    'ops-manage_approve-task': '审批任务',
    'ops-manage_task-log': '任务日志',
    exception: '异常页',
    exception_403: '403',
    exception_404: '404',
    exception_500: '500'
  },
  page: {
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        usernamePlaceholder: '请输入用户名',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{nickname} ！'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住我',
        register: '注册账号',
        otherAccountLogin: '其他账号登录',
        otherLoginMode: '其他登录方式',
        superAdmin: '超级管理员',
        admin: '管理员',
        user: '普通用户'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    about: {
      title: '关于',
      introduction: `SoybeanAdmin 是一个优雅且功能强大的后台管理模板，基于最新的前端技术栈，包括 Vue3, Vite5, TypeScript, Pinia 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。此外，它还采用了基于 ApiFox 的在线Mock数据方案。SoybeanAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。`,
      projectInfo: {
        title: '项目信息',
        version: '版本',
        latestBuildTime: '最新构建时间',
        githubLink: 'Github 地址',
        previewLink: '预览地址'
      },
      prdDep: '生产依赖',
      devDep: '开发依赖'
    },
    home: {
      greeting: '{nickname}你好, 今天又是充满活力的一天!',
      projectCount: '项目数',
      hostCount: '服务器数',
      taskNeedApproveCount: '待审批的任务数',
      taskRunningCount: '执行中的任务数'
    },
    function: {
      tab: {
        tabOperate: {
          title: '标签页操作',
          addTab: '添加标签页',
          addTabDesc: '跳转到关于页面',
          closeTab: '关闭标签页',
          closeCurrentTab: '关闭当前标签页',
          closeAboutTab: '关闭"关于"标签页',
          addMultiTab: '添加多标签页',
          addMultiTabDesc1: '跳转到多标签页页面',
          addMultiTabDesc2: '跳转到多标签页页面(带有查询参数)'
        },
        tabTitle: {
          title: '标签页标题',
          changeTitle: '修改标题',
          change: '修改',
          resetTitle: '重置标题',
          reset: '重置'
        }
      },
      multiTab: {
        routeParam: '路由参数',
        backTab: '返回 function_tab'
      },
      toggleAuth: {
        toggleAccount: '切换账号',
        authHook: '权限钩子函数 `hasAuth`',
        superAdminVisible: '超级管理员可见',
        adminVisible: '管理员可见',
        adminOrUserVisible: '管理员和用户可见'
      },
      request: {
        repeatedErrorOccurOnce: '重复请求错误只出现一次',
        repeatedError: '重复请求错误',
        repeatedErrorMsg1: '自定义请求错误 1',
        repeatedErrorMsg2: '自定义请求错误 2'
      }
    },
    manage: {
      common: {
        status: {
          enable: '启用',
          disable: '禁用'
        }
      },
      role: {
        title: '角色列表',
        roleName: '角色名称',
        roleCode: '角色编码',
        roleStatus: '角色状态',
        roleDesc: '角色描述',
        menuAuth: '菜单权限',
        buttonAuth: '按钮权限',
        apiAuth: 'API权限',
        projectAuth: '项目权限',
        form: {
          roleName: '请输入角色名称',
          roleCode: '请输入角色编码',
          roleStatus: '请选择角色状态',
          roleDesc: '请输入角色描述'
        },
        addRole: '新增角色',
        editRole: '编辑角色'
      },
      user: {
        title: '用户列表',
        username: '用户名',
        userGender: '性别',
        nickname: '昵称',
        userPhone: '手机号',
        userEmail: '邮箱',
        userStatus: '用户状态',
        userRole: '用户角色',
        form: {
          username: '请输入用户名',
          userGender: '请选择性别',
          nickname: '请输入昵称',
          userPhone: '请输入手机号',
          userEmail: '请输入邮箱',
          userStatus: '请选择用户状态',
          userRole: '请选择用户角色'
        },
        addUser: '新增用户',
        editUser: '编辑用户',
        gender: {
          male: '男',
          female: '女'
        }
      },
      userRecord: {
        title: '用户操作记录',
        createdAt: '操作时间',
        ip: 'IP地址',
        method: '请求方法',
        path: '请求路径',
        agent: 'User-Agent',
        body: '请求体',
        userId: '用户ID',
        username: '用户名',
        status: '返回码',
        latency: '延迟(纳秒)',
        resp: '响应体',
        date: '日期',
        form: {
          username: '请输入用户名',
          ip: '请输入完整IP地址',
          date: '请选择日期',
          method: '请选择请求方法',
          status: '请选择后端返回码范围'
        }
      },
      api: {
        path: 'API路径',
        method: '请求方法',
        description: 'API描述',
        apiGroup: 'API分组',
        form: {
          path: '请输入API路径',
          method: '请选择请求方法',
          description: '请输入API描述',
          apiGroup: '请输入API分组',
          tip: {
            path: 'API路径不要写成/user/, 而是/user',
            apiGroup: '新增API直接输入分组,即可自动生成分组父目录,无需单独创建分组'
          }
        },
        search: {
          apiGroup: '请输入完整的API分组名'
        },
        addApi: '新增API',
        addChildApi: '新增子API',
        editApi: '编辑API'
      },
      menu: {
        home: '首页',
        title: '菜单列表',
        parentId: '父级菜单ID',
        menuType: '菜单类型',
        menuName: '菜单名称',
        routeName: '路由名称',
        routePath: '路由路径',
        pathParam: '路径参数',
        layout: '布局',
        page: '页面组件',
        i18nKey: '国际化key',
        icon: '图标',
        localIcon: '本地图标',
        iconTypeTitle: '图标类型',
        order: '排序',
        constant: '常量路由',
        keepAlive: '缓存路由',
        href: '外链',
        hideInMenu: '隐藏菜单',
        activeMenu: '高亮的菜单',
        multiTab: '支持多页签',
        fixedIndexInTab: '固定在页签中的序号',
        query: '路由参数',
        button: '按钮(有修改需要重新绑定角色)',
        props: '传递属性',
        assignProps: '指定属性传递(为空则默认路径参数)',
        buttonCode: '按钮编码',
        buttonDesc: '按钮描述',
        menuStatus: '菜单状态',
        form: {
          home: '请选择首页',
          menuType: '请选择菜单类型',
          menuName: '请输入菜单名称',
          routeName: '请输入路由名称',
          routePath: '请输入路由路径',
          pathParam: '请输入路径参数',
          page: '请选择页面组件',
          layout: '请选择布局组件',
          i18nKey: '请输入国际化key',
          icon: '请输入图标',
          localIcon: '请选择本地图标',
          order: '请输入排序',
          keepAlive: '请选择是否缓存路由',
          href: '请输入外链',
          hideInMenu: '请选择是否隐藏菜单',
          activeMenu: '请选择高亮的菜单的路由名称',
          multiTab: '请选择是否支持多标签',
          fixedInTab: '请选择是否固定在页签中',
          fixedIndexInTab: '请输入固定在页签中的序号',
          queryKey: '请输入路由参数Key',
          queryValue: '请输入路由参数Value',
          button: '请选择是否按钮',
          buttonCode: '请输入按钮编码',
          buttonDesc: '请输入按钮描述',
          propsKey: '请输入传递属性的Key',
          propsValue: '请输入传递属性的Value',
          menuStatus: '请选择菜单状态'
        },
        addMenu: '新增菜单',
        editMenu: '编辑菜单',
        addChildMenu: '新增子菜单',
        type: {
          directory: '目录',
          menu: '菜单'
        },
        iconType: {
          iconify: 'iconify图标',
          local: '本地图标'
        }
      }
    },
    asset: {
      project: {
        title: '项目列表',
        name: '项目名称',
        backendVersion: '后端版本',
        frontendVersion: '前端版本',
        gameRange: '游服ID范围',
        crossRange: '跨服ID范围',
        commonRange: '公共服ID范围',
        oneGameMem: '单游服最大内存(G)',
        oneCrossMem: '单跨服最大内存(G)',
        oneCommonMem: '单公共服最大内存(G)',
        cloudPlatform: '云平台',
        hostTotal: '服务器数量',
        gameTotal: '游服数量',
        crossTotal: '跨服数量',
        commonTotal: '公共服数量',
        form: {
          name: '请输入项目名',
          backendVersion: '请输入后端版本',
          frontendVersion: '请输入前端版本',
          gameRange: '请输入游服ID范围',
          crossRange: '请输入跨服ID范围',
          commonRange: '请输入公共服ID范围',
          oneGameMem: '请输入最大内存(浮点数)',
          oneCrossMem: '请输入最大内存(浮点数)',
          oneCommonMem: '请输入最大内存(浮点数)',
          cloudPlatform: '请选择云平台'
        },
        addProject: '新增项目',
        editProject: '编辑项目',
        search: {
          name: '请输入项目名'
        },
        cloudOperate: {
          create: '新增云项目',
          update: '同步云项目'
        }
      },
      host: {
        title: '服务器列表',
        name: '服务器名',
        ipv4: 'ipv4',
        ipv6: 'ipv6',
        vip: '内网IP',
        sshPort: 'SSH端口',
        projectName: '项目名',
        zone: '地区',
        cloud: '云平台',
        system: '操作系统',
        cores: 'CPU核数',
        dataDisk: '数据盘(G)',
        mem: '内存(G)',
        gameTotal: '游服数量',
        crossTotal: '跨服数量',
        commonTotal: '公共服数量',
        buyHost: '买服务器',
        buyHostCount: '买服务器总数',
        form: {
          name: '请输入服务器名',
          ipv4: '请输入ipv4',
          ipv6: '请输入ipv6',
          vip: '请输入内网IP',
          isIntranet: '如果是一个渠道一个管理机启动服务,那内网可以填写127.0.0.1',
          sshPort: '请输入SSH端口',
          projectName: '请选择项目名',
          zone: '请输入地区',
          cloud: '请选择云平台',
          system: '请输入操作系统',
          cores: '请输入CPU核数',
          dataDisk: '请输入数据盘(G)',
          mem: '请输入内存(G)',
          buyHostCount: '请输入购买服务器的总数'
        },
        addHost: '新增服务器',
        editHost: '编辑服务器',
        search: {
          name: '请输入服务器名',
          ipv4: '请输入ipv4',
          ipv6: '请输入ipv6',
          vip: '请输入内网IP',
          projectName: '请输入项目名',
          zone: '请输入地区',
          cloud: '请选择云平台',
          system: '请输入操作系统'
        }
      }
    },
    opsManage: {
      game: {
        title: '游戏服列表',
        id: '游戏服ID',
        type: '游戏服类型',
        status: '游戏服状态',
        lbName: 'LB名',
        lbListenerPort: 'LB监听器端口',
        serverPort: '游戏服主端口',
        projectName: '项目名',
        hostName: '服务器名',
        hostIpv4: '服务器Ipv4',
        crossId: '跨服ID',
        commonId: '公共服ID',
        addGame: '新增游戏服',
        editGame: '编辑游戏服',
        form: {
          id: '请输入游戏服ID',
          type: '请选择游服类型',
          status: '请选择游服状态',
          lbName: '请输入负载均衡名称',
          lbListenerPort: '请输入负载均衡监听端口',
          serverPort: '请输入游戏服端口',
          projectName: '请选择项目名',
          hostIp: '请选择服务器IP',
          crossId: '请输入跨服ID',
          commonId: '请输入公共服ID'
        },
        search: {
          id: '请输入游戏服ID',
          type: '请选择游服类型',
          status: '请选择游服状态',
          projectName: '请输入项目名',
          hostName: '请输入服务器名',
          crossId: '请输入跨服ID',
          commonId: '请输入公共服ID'
        },
        statusOption: {
          running: '运行中',
          stopped: '停服',
          merged: '已合服',
          operating: '操作中'
        },
        typeOption: {
          game: '游服',
          cross: '跨服',
          common: '公共服'
        }
      },
      template: {
        title: '模板列表',
        name: '模板名称',
        content: '模板内容',
        projectId: '项目名称',
        addTemplate: '新增模板',
        editTemplate: '编辑模板',
        paramBind: '参数模板关系',
        form: {
          name: '请输入模板名称',
          content: '请输入模板内容',
          projectId: '请选择项目名称'
        },
        search: {
          name: '请输入模板名称',
          projectId: '请输入项目ID'
        }
      },
      paramTemplate: {
        title: '参数模板列表',
        keyword: '关键字',
        variable: '映射的变量',
        addParamTemplate: '新增参数模板',
        editParamTemplate: '编辑参数模板',
        form: {
          keyword: '请输入关键字',
          variable: '请输入映射的变量'
        },
        search: {
          keyword: '请输入关键字'
        }
      },
      task: {
        title: '任务列表',
        name: '任务名',
        checkTemplate: '检测模板',
        template: '脚本模板(可按序多选)',
        auditor: '默认审批人员(可多选)',
        host: '执行服务器',
        isIntranet: '内网执行',
        isConcurrent: '并发执行',
        project: '项目',
        addTask: '新增任务',
        editTask: '编辑任务',
        submit: '提交执行任务',
        submitTitle: '提交任务',
        submitAuditor: '审批人员(可多选)',
        execContent: '运营执行内容',
        checkResponse: '检测脚本返回的结果',
        command: '命令',
        taskPendingApproval: '您有任务待审批',
        approve: '审批',
        form: {
          name: '请输入任务名',
          checkTemplate: '请选择检测模板',
          template: '请按顺序选择脚本模板',
          auditor: '不选则默认无需审批',
          host: '请选择执行的服务器',
          project: '请选择项目',
          execContent: '参数模板关键字：映射的变量\n游服: 1_20\n所有服：1_200',
          checkResponse: '返回为空，请检查运维检查脚本的日志',
          submitAuditor: '请选择审批人员',
          submitSuccess: '提交成功'
        },
        search: {
          name: '请输入任务名',
          project: '请选择项目'
        },
        error: {
          radioValueError: '有单选项未选择'
        }
      },
      taskLog: {
        title: '任务日志列表',
        startTime: '执行开始时间',
        endTime: '执行结束时间',
        name: '任务名',
        hostIp: '执行服务器IP',
        execContext: '运营执行内容模板',
        checkResponse: '检测返回',
        commands: '命令',
        stepStatus: '步骤状态',
        status: '任务状态',
        sshResponseStatus: 'SSH返回状态',
        sshResponse: 'SSH返回内容',
        auditors: '默认审批人',
        pendingAuditors: '待审批人员',
        rejectAuditor: '否决人',
        project: '项目',
        submitter: '提交人',
        realTimeLog: '实时任务日志',
        taskStatus: {
          waiting: '等待中',
          running: '执行中',
          success: '执行成功',
          fail: '执行失败',
          reject: '拒绝执行'
        },
        form: {
          name: '请输入任务名',
          project: '请选择项目',
          submitter: '请输入提交人用户名'
        },
        search: {
          name: '请选择任务',
          project: '请选择项目',
          status: '请选择任务状态'
        }
      }
    }
  },
  form: {
    required: '不能为空',
    username: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    },
    ipv4: {
      required: '请输入IPV4',
      invalid: 'IPV4不正确'
    },
    ipv6: {
      required: '请输入IPV6',
      invalid: 'IPV6不正确'
    },
    vip: {
      required: '请输入内网IP',
      invalid: '内网IP不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  datatable: {
    itemCount: '共 {total} 条'
  }
};

export default local;
