<script setup lang="tsx">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { deleteApis, fetchGetAllPages, fetchGetApiList } from '@/service/api';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ApiOperateModal, { type OperateType } from './modules/api-operate-modal.vue';
import ApiSearch from './modules/api-search.vue';

const appStore = useAppStore();

const { bool: visible, setTrue: openModal } = useBoolean();

const wrapperRef = ref<HTMLElement | null>(null);

const { columns, columnChecks, data, loading, pagination, searchParams, resetSearchParams, getData, getDataByPage } =
  useTable({
    apiFn: fetchGetApiList,
    columns: () => [
      {
        type: 'selection',
        align: 'center',
        width: 48
      },
      {
        key: 'id',
        title: $t('page.manage.menu.id'),
        align: 'center',
        render: row => (row.id < 0 ? 0 : row.id)
      },
      {
        key: 'path',
        title: $t('page.manage.api.path'),
        align: 'center',
        minWidth: 120
      },
      {
        key: 'method',
        title: $t('page.manage.api.method'),
        align: 'center',
        minWidth: 120
      },
      {
        key: 'apiGroup',
        title: $t('page.manage.api.apiGroup'),
        align: 'center',
        minWidth: 120
      },
      {
        key: 'description',
        title: $t('page.manage.api.description'),
        align: 'center',
        minWidth: 120
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: 120,
        render: row => (
          <div class="flex-center justify-end gap-8px">
            {row.id < 0 && (
              <NButton type="primary" ghost size="small" onClick={() => handleAddChildApi(row)}>
                {$t('page.manage.api.addChildApi')}
              </NButton>
            )}
            {row.id > 0 && (
              <>
                <NButton type="primary" ghost size="small" onClick={() => handleEdit(row)}>
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
              </>
            )}
          </div>
        )
      }
    ],
    apiParams: {
      current: 1,
      size: 50,
      // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
      // the value can not be undefined, otherwise the property in Form will not be reactive
      apiGroup: null
    }
  });

const { checkedRowKeys, onBatchDeleted, onDeleted } = useTableOperate(data, getData);

const operateType = ref<OperateType>('add');

function handleAdd() {
  operateType.value = 'add';
  openModal();
}

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);
  const { error } = await deleteApis(checkedRowKeys.value);
  if (error) {
    return;
  }
  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  console.log(id);
  const { error } = await deleteApis([id]);
  if (error) {
    return;
  }
  onDeleted();
}

const editingData: Ref<Api.SystemManage.ApiModel | null> = ref(null);

function handleEdit(item: Api.SystemManage.ApiModel) {
  operateType.value = 'edit';
  editingData.value = { ...item };

  openModal();
}

function handleAddChildApi(item: Api.SystemManage.ApiModel) {
  operateType.value = 'addChild';

  editingData.value = { ...item };

  openModal();
}

const allPages = ref<string[]>([]);

async function getAllPages() {
  const { data: pages } = await fetchGetAllPages();
  allPages.value = pages || [];
}

function init() {
  getAllPages();
}

// init
init();
</script>

<template>
  <div ref="wrapperRef" class="flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ApiSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.manage.menu.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
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
        :scroll-x="1088"
        :loading="loading"
        :row-key="row => row.id"
        remote
        :pagination="pagination"
        class="sm:h-full"
      />
      <ApiOperateModal
        v-model:visible="visible"
        :operate-type="operateType"
        :row-data="editingData"
        :all-pages="allPages"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
