<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { $t } from '@/locales';
import { fetchGetButtonList, fetchGetRoleButtons, updateRoleRelation } from '@/service/api';

defineOptions({
  name: 'ButtonAuthModal'
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

const title = computed(() => $t('common.edit') + $t('page.manage.role.buttonAuth'));

const options = shallowRef<CommonType.Option<number>[]>([]);

async function getAllButtons() {
  // request
  const { error, data } = await fetchGetButtonList();
  if (error) {
    return;
  }
  options.value = data.records.map((item: Pick<Api.SystemManage.Button, 'id' | 'buttonCode'>) => ({
    value: item.id,
    label: item.buttonCode
  }));
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  console.log(props.roleId);
  const { error, data } = await fetchGetRoleButtons([props.roleId]);
  if (error) {
    return;
  }
  checks.value = data;
}

async function handleSubmit() {
  console.log(checks.value, props.roleId);
  const { error } = await updateRoleRelation({
    roleId: props.roleId,
    associationType: 3,
    objectIds: checks.value
  });
  if (error) {
    return;
  }
  window.$message?.success?.($t('common.modifySuccess'));

  closeModal();
}

function init() {
  getAllButtons();
  getChecks();
}

// init
init();
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <NSelect v-model:value="checks" multiple filterable :options="options" />
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
