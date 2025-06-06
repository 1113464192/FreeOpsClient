<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { cloneDeep } from 'lodash-es';
import { deleteTasks, fetchGetTaskList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { yesOrNoOptions } from '@/constants/business';
import TaskOperateDrawer from './modules/task-operate-drawer.vue';
import TaskSearch from './modules/task-search.vue';
import SubmitTaskModal from './modules/submit-task-modal.vue';
import TaskRealTimeLogModal from './modules/task-real-time-log-modal.vue';

const appStore = useAppStore();

const { bool: visible, setTrue: openModal } = useBoolean();
const { bool: RealTimeTaskLogModalVisible, setTrue: openRealTimeTaskModal } = useBoolean();

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
  apiFn: fetchGetTaskList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    name: null,
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
      title: $t('page.opsManage.task.name'),
      align: 'center',
      width: 100
    },
    {
      key: 'hostName',
      title: $t('page.opsManage.task.host'),
      align: 'center',
      width: 100
    },
    {
      key: 'isIntranet',
      title: $t('page.opsManage.task.isIntranet'),
      align: 'center',
      width: 40,
      render: row => {
        let isIntranet = 0;
        if (row.isIntranet) {
          isIntranet = 1;
        } else {
          isIntranet = 2;
        }
        const statusOption = yesOrNoOptions.find(option => String(option.value) === String(isIntranet));
        const statusColor = (
          {
            1: 'success', // 是
            2: 'warning' // 否
          } as Record<number, 'success' | 'warning'>
        )[isIntranet as number];
        return (
          <div class="flex-center gap-8px">
            {<NTag type={statusColor}>{statusOption ? $t(statusOption.label as App.I18n.I18nKey) : isIntranet}</NTag>}
          </div>
        );
      }
    },
    {
      key: 'isConcurrent',
      title: $t('page.opsManage.task.isConcurrent'),
      align: 'center',
      width: 40,
      render: row => {
        let isConcurrent = 0;
        if (row.isConcurrent) {
          isConcurrent = 1;
        } else {
          isConcurrent = 2;
        }
        const concurrentOption = yesOrNoOptions.find(option => String(option.value) === String(isConcurrent));
        const concurrentColor = (
          {
            1: 'success', // 是
            2: 'warning' // 否
          } as Record<number, 'success' | 'warning'>
        )[isConcurrent as number];
        return (
          <div class="flex-center gap-8px">
            {
              <NTag type={concurrentColor}>
                {concurrentOption ? $t(concurrentOption.label as App.I18n.I18nKey) : isConcurrent}
              </NTag>
            }
          </div>
        );
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 230,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => openSubmitTaskModal(row.id)}>
            {$t('page.opsManage.task.submit')}
          </NButton>
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
  const { error } = await deleteTasks(checkedRowKeys.value);
  if (error) {
    return;
  }

  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  console.log(id);
  const { error } = await deleteTasks([id]);
  if (error) {
    return;
  }

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}

function openSubmitTaskModal(id: number) {
  const findItem = data.value.find(item => item.id === id) || null;
  editingData.value = cloneDeep(findItem);
  openModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <TaskSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.opsManage.taskLog.realTimeLog')" :bordered="false" size="small" class="card-wrapper">
      <NButton @click="openRealTimeTaskModal">
        {{ $t('page.opsManage.taskLog.realTimeLog') }}
      </NButton>
    </NCard>
    <NCard
      :title="$t('page.opsManage.task.title')"
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
        :virtual-scroll-x="true"
        :scroll-x="622"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <TaskOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
      <SubmitTaskModal v-model:visible="visible" :row-data="editingData" />
      <TaskRealTimeLogModal v-if="RealTimeTaskLogModalVisible" v-model:visible="RealTimeTaskLogModalVisible" />
    </NCard>
  </div>
</template>

<style scoped></style>
