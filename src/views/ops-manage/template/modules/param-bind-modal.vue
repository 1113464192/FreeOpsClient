<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { $t } from '@/locales';
import { fetchGetParamTemplateList, fetchGetTemplateParams, updateTemPlateParams } from '@/service/api';

defineOptions({
  name: 'ParamBindModal'
});

interface Props {
  /** the templateId */
  templateId: number;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

function closeModal() {
  visible.value = false;
}

const title = computed(() => $t('common.edit') + $t('page.opsManage.template.paramBind'));

const paramOptions = shallowRef<CommonType.Option<number>[]>([]);
async function getParamOptions() {
  const { error, data } = await fetchGetParamTemplateList();

  if (!error) {
    const options = data.records.map(item => ({
      label: item.keyword,
      value: item.id
    }));

    paramOptions.value = options;
  }
}

const checks = shallowRef<number[]>([]);

async function getChecks() {
  console.log(props.templateId);
  const { error, data } = await fetchGetTemplateParams(props.templateId);
  if (error) {
    return;
  }
  checks.value = data.map(item => item.id);
}

async function handleSubmit() {
  console.log(checks.value, props.templateId);
  const { error } = await updateTemPlateParams({
    templateId: props.templateId,
    paramIds: checks.value
  });
  if (error) {
    return;
  }
  window.$message?.success?.($t('common.modifySuccess'));

  closeModal();
}

function init() {
  getParamOptions();
  getChecks();
}

// init
init();
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <NSelect v-model:value="checks" multiple filterable :options="paramOptions" />
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
