<script lang="ts" setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { useWebSocket } from '@/composables';

defineOptions({
  name: 'WebSSHModal'
});

interface Props {
  hid: number;
}

const visible = defineModel<boolean>('visible', {
  default: false
});

const props = defineProps<Props>();

const terminalRef = ref<HTMLDivElement | null>(null);
let terminal: Terminal;
let fitAddon: FitAddon;

let closeWebSocket: () => void;
const socket = ref<WebSocket | null>(null);
const isConnected = ref(false);
const inputBuffer = ref('');

const resizeTerminal = () => {
  if (fitAddon) fitAddon.fit();
  socket.value?.send(
    JSON.stringify({
      hid: props.hid,
      height: terminal.rows,
      width: terminal.cols
    })
  );
};

// 初始化 xterm 和 WebSocket 连接
const initWebSSH = () => {
  if (!terminalRef.value) return;

  // 1. 初始化 xterm
  terminal = new Terminal({
    cursorBlink: true, // 光标闪烁
    cursorStyle: 'underline',
    fontSize: 14,
    fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
    theme: { background: '#000000' },
    scrollback: 100
    // tabStopWidth: 4,
  });
  fitAddon = new FitAddon();
  terminal.open(terminalRef.value);
  terminal.loadAddon(fitAddon);
  // 不能初始化的时候fit,需要等terminal准备就绪,可以设置延时操作
  setTimeout(() => {
    fitAddon.fit(); // 自动适配大小
  }, 5);

  const message = JSON.stringify({
    hid: props.hid,
    height: terminal.rows,
    width: terminal.cols
  });

  // 2. 建立 WebSocket 连接
  const { VITE_SERVICE_BASE_URL } = import.meta.env;
  const wsUrl = `${VITE_SERVICE_BASE_URL.replace(/^http(s)?:/, 'ws$1:')}api/tools/webSSH`;
  console.log('webSSH URL:', wsUrl);
  const {
    socket: wsSocket,
    isConnected: isConnected2,
    connectWebSocket,
    closeWebSocket: close
  } = useWebSocket(wsUrl, message, data => {
    terminal.write(data);
    nextTick(() => {
      terminal.scrollToBottom(); // 自动滚动到底部
    });
  });

  if (!isConnected.value) {
    connectWebSocket();
  }

  socket.value = wsSocket.value;
  isConnected.value = isConnected2.value;
  closeWebSocket = close;

  // 监听 wsSocket 和 isConnected2 的变化
  watch(wsSocket, newSocket => {
    socket.value = newSocket;
  });

  watch(isConnected2, newIsConnected => {
    isConnected.value = newIsConnected;
  });
  console.log('WebSSH 连接成功');

  // 3. 修改终端输入监听部分，实时显示输入并使用缓冲区
  terminal.onKey(e => {
    const { key, code, ctrlKey } = e.domEvent;

    if (ctrlKey && code === 'KeyC') {
      // Ctrl+C，发送中断信号
      if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send('\x03'); // Ctrl+C 的 ASCII
      }
      return;
    }

    if (code === 'Enter') {
      // 回车键处理
      if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send(`${inputBuffer.value}\n`); // 发送输入内容
        inputBuffer.value = ''; // 清空缓冲区
      } else {
        console.error('WebSocket 未连接或未打开，无法发送数据');
      }
      terminal.write('\r\n'); // 手动换行
    } else if (code === 'Backspace') {
      // 退格键处理
      if (inputBuffer.value.length > 0) {
        inputBuffer.value = inputBuffer.value.slice(0, -1);
        terminal.write('\b \b'); // 删除字符
      }
    } else if (key.length === 1) {
      // 普通字符
      inputBuffer.value += key; // 存入缓冲区
      terminal.write(key); // 显示到终端
    }
  });
};

watch(
  visible,
  () => {
    window.addEventListener('resize', resizeTerminal);
    if (visible.value) {
      if (props.hid === 0) {
        console.error('缺少 hid 参数');
        return;
      }
      // 等待 DOM 渲染后初始化 xterm
      nextTick(() => {
        initWebSSH();
      });
    } else {
      window.removeEventListener('resize', resizeTerminal);
      if (terminal) {
        terminal.write('\r\n连接关闭');
        terminal.dispose();
        terminal = null as any; // 防止重复调用
      }
      closeWebSocket?.();
    }
  },
  { immediate: true } // 添加 immediate: true 以在初始化时立即响应当前值
);

// 组件卸载时清理 WebSocket
onBeforeUnmount(() => {
  closeWebSocket?.();
});
</script>

<template>
  <div v-if="visible" class="web-ssh-modal">
    <div class="modal-header">
      <!-- <button style="color: white" @click="() => (visible = false)">{{ $t('dropdown.closeCurrent') }}</button> -->
      <button style="background-color: white; color: black; border: none" @click="() => (visible = false)">
        {{ $t('dropdown.closeCurrent') }}
      </button>
    </div>

    <div ref="terminalRef" class="terminal-container"></div>
  </div>
</template>

<style lang="scss" scoped>
.web-ssh-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  z-index: 9999;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: white;
}

.terminal-container {
  flex: 1;
  padding: 10px;
  background-color: black;
  overflow: hidden;
}
</style>
