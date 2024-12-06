<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { approveOpsTask, fetchGetUserTaskPending } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import ApproveSearch from './modules/approve-search.vue';

const appStore = useAppStore();

function handleButtonShow(titleValue: string, msg: string) {
  let contentVNode;
  // 如果 msg 为 undefined 或 null，则将其设置为空字符串
  const message = msg || '';

  try {
    // 尝试解析 JSON
    const jsonData = JSON.parse(message);

    // 格式化 JSON
    contentVNode = () => (
      <pre style="white-space: pre-wrap; word-break: break-word; padding: 10px; background: #f5f5f5; border-radius: 4px;">
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    );
  } catch {
    // 如果不是 JSON，则按普通文本处理
    const lines = message.split('\n');
    contentVNode = () => (
      <div>
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    );
  }

  window.$dialog?.info({
    title: $t(titleValue as App.I18n.I18nKey),
    content: contentVNode
  });
}

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetUserTaskPending,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    taskName: null,
    projectId: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'id',
      title: $t('common.id'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.opsManage.taskLog.name'),
      align: 'center',
      width: 100
    },
    {
      key: 'hostIp',
      title: $t('page.opsManage.taskLog.hostIp'),
      align: 'center',
      width: 100
    },
    {
      key: 'execContext',
      title: $t('page.opsManage.taskLog.execContext'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton
            type="info"
            ghost
            size="small"
            onClick={() => handleButtonShow('page.opsManage.taskLog.execContext', row.execContext)}
          >
            {$t('common.detail')}
          </NButton>
        </div>
      )
    },
    {
      key: 'checkResponse',
      title: $t('page.opsManage.taskLog.checkResponse'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton
            type="info"
            ghost
            size="small"
            onClick={() => handleButtonShow('page.opsManage.taskLog.checkResponse', row.checkResponse)}
          >
            {$t('common.detail')}
          </NButton>
        </div>
      )
    },
    {
      key: 'commands',
      title: $t('page.opsManage.taskLog.commands'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton
            type="info"
            ghost
            size="small"
            onClick={() => handleButtonShow('page.opsManage.taskLog.commands', row.commands?.join('\n') || '')}
          >
            {$t('common.detail')}
          </NButton>
        </div>
      )
    },
    {
      key: 'auditorNames',
      title: $t('page.opsManage.taskLog.auditors'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton
            type="info"
            ghost
            size="small"
            onClick={() => handleButtonShow('page.opsManage.taskLog.auditors', row.auditorNames?.join('\n') || '')}
          >
            {$t('common.detail')}
          </NButton>
        </div>
      )
    },
    {
      key: 'pendingAuditorNames',
      title: $t('page.opsManage.taskLog.pendingAuditors'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton
            type="info"
            ghost
            size="small"
            onClick={() =>
              handleButtonShow('page.opsManage.taskLog.pendingAuditors', row.pendingAuditorNames?.join('\n') || '')
            }
          >
            {$t('common.detail')}
          </NButton>
        </div>
      )
    },
    {
      key: 'projectName',
      title: $t('page.opsManage.taskLog.project'),
      align: 'center',
      width: 100
    },
    {
      key: 'submitterName',
      title: $t('page.opsManage.taskLog.submitter'),
      align: 'center',
      width: 100
    },

    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NPopconfirm onPositiveClick={() => approveTask(row.id, true)}>
            {{
              default: () => $t('common.confirmOperation'),
              trigger: () => (
                <NButton type="primary" size="small">
                  {$t('common.allow')}
                </NButton>
              )
            }}
          </NPopconfirm>
          <NPopconfirm onPositiveClick={() => approveTask(row.id, false)}>
            {{
              default: () => $t('common.confirmOperation'),
              trigger: () => (
                <NButton type="warning" size="small">
                  {$t('common.reject')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  checkedRowKeys
  // closeDrawer
} = useTableOperate(data, getData);

async function approveTask(taskId: number, isAllow: boolean) {
  const model: Api.OpsManage.ApproveOpsTaskReq = {
    id: taskId,
    isAllow
  };
  console.log('model', model);
  const { error } = await approveOpsTask(model);
  if (error) {
    return;
  }
  window.$message?.success($t('common.success'));
  getDataByPage();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ApproveSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.opsManage.task.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <TableHeaderOperation v-model:columns="columnChecks" disabled-delete :loading="loading" @refresh="getData" />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :virtual-scroll-x="true"
        :scroll-x="1332"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
