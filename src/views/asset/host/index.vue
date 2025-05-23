<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { deleteHosts, fetchGetHostList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAuth } from '@/hooks/business/auth';
import HostOperateDrawer from './modules/host-operate-drawer.vue';
import HostSearch from './modules/host-search.vue';
import BuyHostModal from './modules/buy-host-modal.vue';
import WebSSHModal from './modules/webSSHModal.vue';

let hid = 0;

const appStore = useAppStore();

const { hasAuth } = useAuth();

const { bool: buyHostModalVisible, setTrue: openBuyHostModal, setFalse: closeBuyHostModal } = useBoolean();
const { bool: webSSHVisible, setTrue: openWebSSHModal } = useBoolean();
const hasWebSSHAuth = hasAuth('webssh');
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
  apiFn: fetchGetHostList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 20,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    status: null,
    projectId: null,
    name: null,
    ipv4: null,
    ipv6: null,
    vip: null,
    zone: null,
    cloud: null,
    system: null
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
      title: $t('page.asset.host.name'),
      align: 'center',
      width: 160
    },
    {
      key: 'ipv4',
      title: $t('page.asset.host.ipv4'),
      align: 'center',
      width: 140
    },
    {
      key: 'ipv6',
      title: $t('page.asset.host.ipv6'),
      align: 'center',
      width: 220
    },
    {
      key: 'vip',
      title: $t('page.asset.host.vip'),
      align: 'center',
      width: 140
    },
    {
      key: 'sshPort',
      title: $t('page.asset.host.sshPort'),
      align: 'center',
      width: 80
    },
    {
      key: 'zone',
      title: $t('page.asset.host.zone'),
      align: 'center',
      width: 60
    },
    {
      key: 'cloud',
      title: $t('page.asset.host.cloud'),
      align: 'center',
      width: 60
    },
    {
      key: 'system',
      title: $t('page.asset.host.system'),
      align: 'center',
      width: 200
    },
    {
      key: 'projectName',
      title: $t('page.asset.host.projectName'),
      align: 'center',
      width: 100
    },
    {
      key: 'cores',
      title: $t('page.asset.host.cores'),
      align: 'center',
      width: 80
    },
    {
      key: 'mem',
      title: $t('page.asset.host.mem'),
      align: 'center',
      width: 80
    },
    {
      key: 'dataDisk',
      title: $t('page.asset.host.dataDisk'),
      align: 'center',
      width: 80
    },
    {
      key: 'gameTotal',
      title: $t('page.asset.project.gameTotal'),
      align: 'center',
      width: 90
    },
    {
      key: 'crossTotal',
      title: $t('page.asset.project.crossTotal'),
      align: 'center',
      width: 90
    },
    {
      key: 'commonTotal',
      title: $t('page.asset.project.commonTotal'),
      align: 'center',
      width: 90
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 260,
      render: row => (
        <div class="flex-center gap-8px">
          {hasWebSSHAuth && (
            <NButton type="warning" ghost size="small" onClick={() => openWebSSH(row.id)}>
              {$t('page.asset.host.webSSH')}
            </NButton>
          )}
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
  const { error } = await deleteHosts(checkedRowKeys.value);
  if (error) {
    return;
  }

  onBatchDeleted();
}

async function handleDelete(id: number) {
  // request
  console.log(id);
  const { error } = await deleteHosts([id]);
  if (error) {
    return;
  }

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}

function buyHostSuccess() {
  closeBuyHostModal();
  getDataByPage();
}

function openWebSSH(id: number) {
  hid = id;
  openWebSSHModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <HostSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('common.operate')" :bordered="false" size="small" class="card-wrapper">
      <NButton @click="openBuyHostModal">
        {{ $t('page.asset.host.buyHost') }}
      </NButton>
    </NCard>
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
        :scroll-x="2042"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <HostOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
      <BuyHostModal v-model:visible="buyHostModalVisible" @submitted="buyHostSuccess" />
      <WebSSHModal v-model:visible="webSSHVisible" :hid="hid" />
    </NCard>
  </div>
</template>

<style scoped></style>
