<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { $t } from '@/locales';
import { fetchAllProjects, fetchGetRoleProjects, updateRoleRelation } from '@/service/api';

defineOptions({
  name: 'ProjectAuthModal'
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

const title = computed(() => $t('common.edit') + $t('page.manage.role.projectAuth'));

const options = shallowRef<CommonType.Option<number>[]>([]);

async function getAllProjects() {
  // request
  const { error, data } = await fetchAllProjects();
  if (error) {
    return;
  }
  options.value = data.map((item: Pick<Api.AssetManage.Project, 'id' | 'name'>) => ({
    value: item.id,
    label: item.name
  }));
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  console.log(props.roleId);
  const { error, data } = await fetchGetRoleProjects([props.roleId]);
  if (error) {
    return;
  }
  checks.value = data;
}

async function handleSubmit() {
  console.log(checks.value, props.roleId);
  const { error } = await updateRoleRelation({
    roleId: props.roleId,
    associationType: 4,
    objectIds: checks.value
  });
  if (error) {
    return;
  }
  window.$message?.success?.($t('common.modifySuccess'));

  closeModal();
}

function init() {
  getAllProjects();
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
