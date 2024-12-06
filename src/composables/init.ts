import { ref } from 'vue';
import { $t } from '@/locales';
import { useWebSocket } from './';

const webSocketInstance = ref<any>(null); // 保存 WebSocket 实例

function initCheckTaskApprove() {
  const { VITE_SERVICE_BASE_URL } = import.meta.env;
  const wsUrl = `${VITE_SERVICE_BASE_URL.replace(/^http(s)?:/, 'ws$1:')}ops/task-need-approve`;
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

export function customInit() {
  initCheckTaskApprove();
}
