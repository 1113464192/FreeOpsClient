<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { createCloudProject, deleteProjects, fetchGetProjectList, updateCloudProject } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import ProjectOperateDrawer from './modules/project-operate-drawer.vue';
import ProjectSearch from './modules/project-search.vue';

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
  apiFn: fetchGetProjectList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    name: null
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
      title: $t('page.asset.project.name'),
      align: 'center',
      width: 100
    },
    {
      key: 'backendVersion',
      title: $t('page.asset.project.backendVersion'),
      align: 'center',
      width: 200
    },
    {
      key: 'frontendVersion',
      title: $t('page.asset.project.frontendVersion'),
      align: 'center',
      width: 200
    },
    {
      key: 'gameRange',
      title: $t('page.asset.project.gameRange'),
      align: 'center',
      width: 130
    },
    {
      key: 'crossRange',
      title: $t('page.asset.project.crossRange'),
      align: 'center',
      width: 130
    },
    {
      key: 'commonRange',
      title: $t('page.asset.project.commonRange'),
      align: 'center',
      width: 130
    },
    {
      key: 'oneGameMem',
      title: $t('page.asset.project.oneGameMem'),
      align: 'center',
      width: 130
    },
    {
      key: 'oneCrossMem',
      title: $t('page.asset.project.oneCrossMem'),
      align: 'center',
      width: 130
    },
    {
      key: 'oneCommonMem',
      title: $t('page.asset.project.oneCommonMem'),
      align: 'center',
      width: 130
    },
    {
      key: 'cloudPlatform',
      title: $t('page.asset.project.cloudPlatform'),
      align: 'center',
      width: 100
    },
    {
      key: 'hostTotal',
      title: $t('page.asset.project.hostTotal'),
      align: 'center',
      width: 100
    },
    {
      key: 'gameTotal',
      title: $t('page.asset.project.gameTotal'),
      align: 'center',
      width: 100
    },
    {
      key: 'crossTotal',
      title: $t('page.asset.project.crossTotal'),
      align: 'center',
      width: 100
    },
    {
      key: 'commonTotal',
      title: $t('page.asset.project.commonTotal'),
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
    },
    {
      key: 'cloudOperate',
      title: $t('common.cloudOperate'),
      align: 'center',
      width: 350,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => createCloudProject(row.name, row.cloudPlatform)}>
            {$t('page.asset.project.cloudOperate.create')}
          </NButton>
          <NButton type="primary" ghost size="small" onClick={() => updateCloudProject(row.name, row.cloudPlatform)}>
            {$t('page.asset.project.cloudOperate.update')}
          </NButton>
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
  const { error } = await deleteProjects(checkedRowKeys.value);
  if (error) {
    return;
  }

  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  console.log(id);
  const { error } = await deleteProjects([id]);
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
    <ProjectSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.asset.project.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
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
        :scroll-x="2352"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <ProjectOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
