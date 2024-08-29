<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import { $t } from '@/locales';
import { fetchGetApiTree, fetchGetRoleApis, updateRoleRelation } from '@/service/api';

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

const tree = shallowRef<Api.SystemManage.ApiTree[]>([]);

const showIrrelevantNodes = ref(false);

const pattern = ref('');

async function getTree() {
  const { error, data } = await fetchGetApiTree();

  if (!error) {
    tree.value = data;
  }
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  console.log(props.roleId);
  // request
  const { error, data } = await fetchGetRoleApis([props.roleId]);
  if (error) {
    return;
  }
  checks.value = data;
}

async function handleSubmit() {
  console.log(checks.value, props.roleId);
  // request
  // 先去除掉checks.value中为负数的ID(目录ID)
  checks.value = checks.value.filter(id => id > 0);
  const { error } = await updateRoleRelation({
    roleId: props.roleId,
    associationType: 1,
    objectIds: checks.value
  });
  if (error) {
    return;
  }
  window.$message?.success?.($t('common.modifySuccess'));

  closeModal();
}

function init() {
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
    <NInput v-model:value="pattern" placeholder="搜索" />
    <NSwitch v-model:value="showIrrelevantNodes">
      <template #checked>展示搜索无关的节点</template>
      <template #unchecked>隐藏搜索无关的节点</template>
    </NSwitch>
    <NTree
      v-model:checked-keys="checks"
      :show-irrelevant-nodes="showIrrelevantNodes"
      :pattern="pattern"
      :data="tree"
      cascade
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
