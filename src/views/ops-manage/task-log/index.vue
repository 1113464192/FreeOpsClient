<script setup lang="tsx">
import { shallowRef } from 'vue';
import { NButton, NTag } from 'naive-ui';
import { fetchGetOpsTaskLog } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { taskStatusOptions } from '@/constants/business';
import TaskLogSearch from './modules/task-log-search.vue';
import StepStatusList from './modules/stepStatusList.vue';

const appStore = useAppStore();

function handleButtonShow(titleValue: string, msg: string) {
  let contentVNode;
  // 如果 msg 为 undefined 或 null 或 空字符串，则将其设置为'\n\n'
  console.log('msg', msg);
  const message = msg || '\n\n';

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

const StepStatusTableVisible = shallowRef();
const stepStatusData = shallowRef<Api.OpsManage.TaskLogStepStatus[]>([]);
function handleStepStatusShow(stepStatus: Api.OpsManage.TaskLogStepStatus[], visible: boolean) {
  stepStatusData.value = stepStatus;
  console.log('stepStatusData', stepStatusData.value);
  StepStatusTableVisible.value = visible;
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
  apiFn: fetchGetOpsTaskLog,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    name: null,
    projectId: null,
    username: null
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
      key: 'startTime',
      title: $t('page.opsManage.taskLog.startTime'),
      align: 'center',
      width: 100
    },
    {
      key: 'endTime',
      title: $t('page.opsManage.taskLog.endTime'),
      align: 'center',
      width: 100
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
      key: 'status',
      title: $t('page.opsManage.taskLog.status'),
      align: 'center',
      width: 100,
      render: row => {
        const statusOption = taskStatusOptions.find(option => String(option.value) === String(row.status));
        const statusColor =
          row.status === 0
            ? undefined
            : (
                {
                  1: 'info', // running
                  2: 'success', // success
                  3: 'error', // fail
                  4: 'warning' // reject
                } as Record<number, 'success' | 'error' | 'warning' | 'info'>
              )[row.status as number] || 'info';
        return (
          <div class="flex-center gap-8px">
            {row.status === 0 ? ( // waiting
              <NTag>{statusOption ? $t(statusOption.label as App.I18n.I18nKey) : row.status}</NTag>
            ) : (
              <NTag type={statusColor}>{statusOption ? $t(statusOption.label as App.I18n.I18nKey) : row.status}</NTag>
            )}
          </div>
        );
      }
    },
    {
      key: 'stepStatus',
      title: $t('page.opsManage.taskLog.stepStatus'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="info" ghost size="small" onClick={() => handleStepStatusShow(row.stepStatus, true)}>
            {$t('common.detail')}
          </NButton>
        </div>
      )
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
      key: 'rejectAuditorName',
      title: $t('page.opsManage.taskLog.rejectAuditor'),
      align: 'center',
      width: 70
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
    }
  ]
});

const {
  checkedRowKeys
  // closeDrawer
} = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <TaskLogSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.opsManage.taskLog.title')"
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
        :scroll-x="1382"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <StepStatusList
        v-model:visible="StepStatusTableVisible"
        :row-data="stepStatusData"
        :data="stepStatusData"
        @closed="() => (StepStatusTableVisible = false)"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
