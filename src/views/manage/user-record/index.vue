<script setup lang="tsx">
import { NButton } from 'naive-ui';
// import { fetchGetUserRecordList, fetchGetUserRecordMonths } from '@/service/api';
import { fetchGetUserRecordList } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import UserRecordSearch from './modules/user-record-search.vue';

const appStore = useAppStore();

// async function getUserRecordDate() {
//   const { data, error } = await fetchGetUserRecordMonths();
//   if (error) {
//     return '';
//   }

//   if (data.dates.length > 0) {
//     const dates = data.dates;
//     // 假设日期格式为 "YYYY_MM"，可以直接进行字符串比较
//     const latestDate = dates.sort().pop();
//     if (latestDate) {
//       return latestDate;
//     }
//     return '';
//   }
//   return '';
// }

// const defaultDate = await getUserRecordDate();

function handleButtonShow(titleValue: string, msg: string) {
  window.$dialog?.info({
    title: $t(titleValue as App.I18n.I18nKey),
    content: msg
  });
}

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
      minWidth: 120
    },
    {
      key: 'createdAt',
      title: $t('page.manage.userRecord.createdAt'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'ip',
      title: $t('page.manage.userRecord.ip'),
      align: 'center',
      minWidth: 90
    },
    {
      key: 'method',
      title: $t('page.manage.userRecord.method'),
      minWidth: 120
    },
    {
      key: 'path',
      title: $t('page.manage.userRecord.path'),
      align: 'center',
      width: 140
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
      width: 130,
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
      width: 130,
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
      width: 130,
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
        :scroll-x="702"
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
