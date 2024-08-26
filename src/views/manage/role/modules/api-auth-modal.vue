<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { $t } from '@/locales';
import { fetchGetAllPages, fetchGetMenuTree, fetchGetRoleMenus, updateRoleRelation } from '@/service/api';

defineOptions({
  name: 'ApiAuthModal'
});

interface Props {
  /** the roleId */
  roleId: number;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('common.edit') + $t('page.manage.role.apiAuth'));

const apiBase = shallowRef('');

async function getApiBase() {
  console.log(props.roleId);

  apiBase.value = 'api';
}

async function updateApiBase(val: string) {
  apiBase.value = val;
}

const pages = shallowRef<string[]>([]);

async function getPages() {
  const { error, data } = await fetchGetAllPages();

  if (!error) {
    pages.value = data;
  }
}

const pageSelectOptions = computed(() => {
  const opts: CommonType.Option[] = pages.value.map(page => ({
    label: page,
    value: page
  }));

  return opts;
});

const tree = shallowRef<Api.SystemManage.MenuTree[]>([]);

async function getTree() {
  const { error, data } = await fetchGetMenuTree();

  if (!error) {
    tree.value = data;
  }
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  console.log(props.roleId);
  // request
  const { error, data } = await fetchGetRoleMenus([props.roleId]);
  if (error) {
    return;
  }
  checks.value = data;
}

async function handleSubmit() {
  console.log(checks.value, props.roleId);
  // request
  const { error } = await updateRoleRelation({
    roleId: props.roleId,
    associationType: 2,
    objectIds: checks.value
  });
  if (error) {
    return;
  }
  window.$message?.success?.($t('common.modifySuccess'));

  closeModal();
}

function init() {
  getApiBase();
  getPages();
  getTree();
  getChecks();
}

watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <div class="flex-y-center gap-16px pb-12px">
      <div>{{ $t('page.manage.menu.home') }}</div>
      <NSelect
        :value="apiBase"
        :options="pageSelectOptions"
        size="small"
        class="w-160px"
        @update:value="updateApiBase"
      />
    </div>
    <NTree
      v-model:checked-keys="checks"
      :data="tree"
      key-field="id"
      checkable
      expand-on-click
      virtual-scroll
      block-line
      class="h-280px"
    />
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-16px" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" class="mt-16px" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
