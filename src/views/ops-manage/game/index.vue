<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { deleteGames, fetchGetGameList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { gameStatusOptions, gameTypeOptions } from '@/constants/business';
import GameOperateDrawer from './modules/game-operate-drawer.vue';
import GameSearch from './modules/game-search.vue';

const appStore = useAppStore();

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
  apiFn: fetchGetGameList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    id: null,
    type: null,
    projectName: null,
    hostName: null,
    crossId: null,
    commonId: null,
    ipv4: null
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
      key: 'type',
      title: $t('page.opsManage.game.type'),
      align: 'center',
      width: 100,
      render: row => {
        const typeOption = gameTypeOptions.find(option => String(option.value) === String(row.type));
        const typeColor =
          (
            {
              1: 'success', // game
              2: 'warning', // cross
              3: 'error' // common
            } satisfies Record<number, 'success' | 'warning' | 'error'>
          )[row.type] || 'info';
        return (
          <div class="flex-center gap-8px">
            <NTag type={typeColor}>{typeOption ? $t(typeOption.label as App.I18n.I18nKey) : row.type}</NTag>
          </div>
        );
      }
    },
    {
      key: 'status',
      title: $t('page.opsManage.game.status'),
      align: 'center',
      width: 100,
      render: row => {
        const statusOption = gameStatusOptions.find(option => String(option.value) === String(row.status));
        const statusColor =
          (
            {
              1: 'success', // running
              2: 'error', // stopped
              3: 'warning', // merged
              4: 'info' // operating
            } satisfies Record<number, 'success' | 'error' | 'warning' | 'info'>
          )[row.status] || 'info';
        return (
          <div class="flex-center gap-8px">
            <NTag type={statusColor}>{statusOption ? $t(statusOption.label as App.I18n.I18nKey) : row.status}</NTag>
          </div>
        );
      }
    },
    {
      key: 'serverPort',
      title: $t('page.opsManage.game.serverPort'),
      align: 'center',
      width: 100
    },
    {
      key: 'projectName',
      title: $t('page.opsManage.game.projectName'),
      align: 'center',
      width: 100
    },
    {
      key: 'hostName',
      title: $t('page.opsManage.game.hostName'),
      align: 'center',
      minWidth: 160
    },
    {
      key: 'ipv4',
      title: $t('page.asset.host.ipv4'),
      align: 'center',
      minWidth: 140
    },
    {
      key: 'lbName',
      title: $t('page.opsManage.game.lbName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'lbListenerPort',
      title: $t('page.opsManage.game.lbListenerPort'),
      align: 'center',
      width: 110
    },
    {
      key: 'crossId',
      title: $t('page.opsManage.game.crossId'),
      align: 'center',
      width: 64
    },
    {
      key: 'commonId',
      title: $t('page.opsManage.game.commonId'),
      align: 'center',
      width: 100
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
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
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);
  const { error } = await deleteGames(checkedRowKeys.value);
  if (error) {
    return;
  }

  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  console.log(id);
  const { error } = await deleteGames([id]);
  if (error) {
    return;
  }

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <GameSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.opsManage.game.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="1322"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <GameOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
