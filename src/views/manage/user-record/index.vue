<script setup lang="tsx">
import { onMounted } from 'vue';
import { NButton } from 'naive-ui';
// import { fetchGetUserRecordList, fetchGetUserRecordMonths } from '@/service/api';
import { fetchGetUserRecordList, fetchGetUserRecordMonths } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import UserRecordSearch from './modules/user-record-search.vue';

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

// 立即调用的异步函数（IIFE）
(async () => {
  await fetchLatestDate();
})();

const {
  columns,
  columnChecks,
  data,
  loading,
  getData,
  getDataByPage,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetUserRecordList,
  apiParams: {
    current: 1,
    size: 30,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    username: null,
    method: null,
    status: null,
    ip: null,
    date: null
  },
  columns: () => [
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'username',
      title: $t('page.manage.userRecord.username'),
      align: 'center',
      width: 120
    },
    {
      key: 'createdAt',
      title: $t('page.manage.userRecord.createdAt'),
      align: 'center',
      width: 120
    },
    {
      key: 'ip',
      title: $t('page.manage.userRecord.ip'),
      align: 'center',
      width: 60
    },
    {
      key: 'method',
      title: $t('page.manage.userRecord.method'),
      width: 74
    },
    {
      key: 'path',
      title: $t('page.manage.userRecord.path'),
      align: 'center',
      width: 120
    },
    {
      key: 'status',
      title: $t('page.manage.userRecord.status'),
      align: 'center',
      width: 64
    },
    {
      key: 'latency',
      title: $t('page.manage.userRecord.latency'),
      align: 'center',
      width: 100
    },
    {
      key: 'agent',
      title: $t('page.manage.userRecord.agent'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton
            type="info"
            ghost
            size="small"
            onClick={() => handleButtonShow('page.manage.userRecord.agent', row.agent)}
          >
            {$t('common.detail')}
          </NButton>
        </div>
      )
    },
    {
      key: 'body',
      title: $t('page.manage.userRecord.body'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton
            type="info"
            ghost
            size="small"
            onClick={() => handleButtonShow('page.manage.userRecord.body', row.body)}
          >
            {$t('common.detail')}
          </NButton>
        </div>
      )
    },
    {
      key: 'resp',
      title: $t('page.manage.userRecord.resp'),
      align: 'center',
      width: 100,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton
            type="info"
            ghost
            size="small"
            onClick={() => handleButtonShow('page.manage.userRecord.resp', row.resp)}
          >
            {$t('common.detail')}
          </NButton>
        </div>
      )
    }
  ]
});
const { checkedRowKeys } = useTableOperate(data, getData);

async function fetchLatestDate() {
  try {
    const { data: mData, error } = await fetchGetUserRecordMonths();
    if (error) {
      return;
    }
    const dates = mData.dates;
    const latestDate = dates.sort().pop();
    if (latestDate) {
      searchParams.date = latestDate;
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  await fetchLatestDate();
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserRecordSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.manage.userRecord.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="1012"
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
