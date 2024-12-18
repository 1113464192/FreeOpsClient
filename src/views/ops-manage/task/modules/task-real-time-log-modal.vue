<script setup lang="tsx">
import { ref, watch } from 'vue';
import { NButton, NTag } from 'naive-ui';
import { $t } from '@/locales';
import { taskStatusOptions } from '@/constants/business';
import { useWebSocket } from '@/composables';

defineOptions({
  name: 'TaskRealTimeLogModal'
});

const visible = defineModel<boolean>('visible', {
  default: false
});

const title = $t('page.opsManage.taskLog.realTimeLog');

const taskData = ref<Api.OpsManage.TaskRealTimeLog[]>([]);

let closeWebSocket: () => void;

function createTaskReadTimeDataWebSocket() {
  const { VITE_SERVICE_BASE_URL } = import.meta.env;
  const wsUrl = `${VITE_SERVICE_BASE_URL.replace(/^http(s)?:/, 'ws$1:')}api/ops/task-running-ws`;
  const {
    socket,
    isConnected,
    connectWebSocket,
    closeWebSocket: close
  } = useWebSocket(wsUrl, '', data => {
    taskData.value = data;
  });
  if (!isConnected.value && socket.value?.readyState !== WebSocket.OPEN) {
    connectWebSocket();
  }
  closeWebSocket = close;
}

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

function createColumns() {
  return [
    {
      title: $t('page.opsManage.taskLog.name'),
      key: 'name',
      align: 'center' as const,
      width: 150
    },
    {
      title: $t('page.opsManage.taskLog.commands'),
      key: 'command',
      align: 'center' as const,
      width: 600
    },
    {
      title: $t('page.opsManage.taskLog.startTime'),
      key: 'startTime',
      align: 'center' as const,
      width: 150
    },
    {
      title: $t('page.opsManage.taskLog.endTime'),
      key: 'endTime',
      align: 'center' as const,
      width: 150
    },
    {
      title: $t('page.opsManage.taskLog.status'),
      key: 'status',
      align: 'center' as const,
      width: 100,
      render: (row: Api.OpsManage.TaskRealTimeLog) => {
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
      title: $t('page.opsManage.taskLog.sshResponseStatus'),
      key: 'sshResponseStatus',
      align: 'center' as const,
      width: 64
    },
    {
      title: $t('page.opsManage.taskLog.sshResponse'),
      key: 'response',
      align: 'center' as const,
      width: 100,
      render: (row: Api.OpsManage.TaskRealTimeLog) => (
        <NButton
          type="info"
          ghost
          size="small"
          onClick={() => handleButtonShow('page.opsManage.taskLog.sshResponse', row.response)}
        >
          Detail
        </NButton>
      )
    },
    {
      key: 'submitterName',
      title: $t('page.opsManage.taskLog.submitter'),
      align: 'center' as const,
      width: 100
    }
  ];
}

const columns = createColumns();

watch(
  visible,
  () => {
    if (visible.value) {
      createTaskReadTimeDataWebSocket();
    } else {
      closeWebSocket();
    }
  },
  { immediate: true }
); // 添加 immediate: true 以在初始化时立即响应当前值
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-1500px">
    <NDataTable
      :columns="columns"
      :data="taskData"
      :pagination="false"
      :bordered="false"
      size="small"
      :flex-height="false"
      :virtual-scroll-x="true"
      :scroll-x="1414"
      remote
      :row-key="row => row.command"
    />
    <template #footer>
      <NSpace :size="26" justify="end">
        <NButton type="warning" @click="() => (visible = false)">{{ $t('common.close') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
