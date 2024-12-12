import { onBeforeUnmount, ref } from 'vue';
import { localStg } from '@/utils/storage';

export function useWebSocket(url: string, onMessage: (data: any) => void) {
  const socket = ref<WebSocket | null>(null);
  const isConnected = ref(false);
  let retryCount = 0;
  const maxRetries = 5;
  const token = localStg.get('token');
  let shouldRetry = true; // 添加一个标志来控制是否应该重试连接

  const connectWebSocket = () => {
    if (retryCount >= maxRetries) {
      console.error(`WebSocket连接失败超过${maxRetries}次，停止重试`);
      window.$message?.error('WebSocket连接失败');
      return;
    }

    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      isConnected.value = true;
      console.log('WebSocket 连接成功');

      // 检查 token 是否存在
      if (!token) {
        console.error('WebSocket 认证失败: 缺少 token');
        socket.value?.close();
        return;
      }

      // 发送 token 进行身份验证
      socket.value?.send(JSON.stringify({ type: 'auth', token }));
    };

    socket.value.onmessage = event => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        data = event.data; // 如果解析 JSON 失败，则将其视为纯文本
      }
      // 检查是否是 Ping 消息
      if (data === 'ping') {
        console.log('收到 Ping 消息，返回 Pong');
        socket.value?.send('pong');
        return; // 不继续处理其他消息
      }
      if (typeof data === 'object' && data.type === 'auth_result') {
        if (!data.success) {
          console.error('WebSocket 认证失败');
          socket.value?.close();
          retryCount += 1;
        } else {
          console.log('WebSocket 认证成功');
          shouldRetry = true; // 认证成功后允许重试
          retryCount = 0; // 重置重试计数
        }
      } else {
        onMessage(data);
      }
    };

    socket.value.onclose = event => {
      isConnected.value = false;
      console.log('WebSocket 连接关闭', event);
      if (event.wasClean) {
        shouldRetry = false;
        console.log('WebSocket 正常关闭，停止重试');
      } else {
        console.warn(`WebSocket 异常关闭，第 ${retryCount} 次重试`);
      }
      retryCount += 1;
      if (shouldRetry && retryCount < maxRetries) {
        setTimeout(connectWebSocket, 20000); // 延迟重试连接 20 秒
      }
    };

    socket.value.onerror = error => {
      console.error('WebSocket 连接出错', error);
      retryCount += 1;
      if (shouldRetry) {
        setTimeout(connectWebSocket, 20000); // 延迟重试连接 20 秒
      }
    };
  };

  const closeWebSocket = () => {
    shouldRetry = false; // 关闭连接时不再重试
    if (socket.value) {
      socket.value.close(1000, 'Client closed connection');
      socket.value = null;
      isConnected.value = false;
    }
  };

  onBeforeUnmount(() => {
    closeWebSocket();
  });

  return {
    socket: ref(socket.value), // 确保返回的 socket 是 ref
    isConnected: ref(isConnected.value), // 确保返回的 isConnected 是 ref
    connectWebSocket,
    closeWebSocket
  };
}
