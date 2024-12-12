import { ref } from 'vue';
import { $t } from '@/locales';
import { useWebSocket } from './';

const webSocketInstance = ref<any>(null); // 保存 WebSocket 实例

function initCheckTaskApprove() {
  if (!webSocketInstance.value) {
    console.log('WebSocket 未初始化，开始创建实例');
    const { VITE_SERVICE_BASE_URL } = import.meta.env;
    const wsUrl = `${VITE_SERVICE_BASE_URL.replace(/^http(s)?:/, 'ws$1:')}api/ops/task-need-approve`;
    webSocketInstance.value = useWebSocket(wsUrl, data => {
      const hasTaskNeedApprove = data === true;
      if (hasTaskNeedApprove) {
        window.$notification?.success({
          content: $t('page.opsManage.task.taskPendingApproval'),
          duration: 4500
        });
      }
    });
  }

  if (
    webSocketInstance.value &&
    (webSocketInstance.value.isConnected?.value || webSocketInstance.value.socket?.value?.readyState === WebSocket.OPEN)
  ) {
    console.log('WebSocket 已经连接或正在连接，不需要重新初始化');
    return;
  }

  console.log('初始化 WebSocket 连接');
  webSocketInstance.value.connectWebSocket();
}

export function customInit() {
  initCheckTaskApprove();
}
