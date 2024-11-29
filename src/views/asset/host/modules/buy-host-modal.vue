<script setup lang="ts">
import { reactive, ref, shallowRef, watch } from 'vue';
import { $t } from '@/locales';
import { createCloudHost, fetchGetSelfAllProjects } from '@/service/api';
import { useNaiveForm } from '@/hooks/common/form';
import { CloudPlatformOptions } from '@/constants/constants';

defineOptions({
  name: 'BuyHostModal'
});

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef } = useNaiveForm();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const countStr = shallowRef<string>('');

type Model = {
  projectId: number;
  cloud: string;
  count: number;
};

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    projectId: 0,
    cloud: '',
    count: 0
  };
}

const projectOptions = ref<CommonType.Option<number>[]>([]);
async function getProjectOptions() {
  const { error, data } = await fetchGetSelfAllProjects();

  if (!error) {
    const options = data.map(item => ({
      label: item.label,
      value: item.value
    }));

    projectOptions.value = options;
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  model.count = Number.parseInt(countStr.value, 10);
  console.log('model', model);
  // 购买参数信息
  const { error: hostError } = await createCloudHost(model.projectId, model.cloud, model.count);
  if (hostError) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    getProjectOptions();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="$t('page.asset.host.buyHost')" preset="card" class="w-800px">
    <NForm ref="formRef" :model="model" label-placement="left" :label-width="100">
      <NFormItem :label="$t('page.asset.host.projectName')" path="projectId">
        <NSelect v-model:value="model.projectId" :options="projectOptions" />
      </NFormItem>
      <NFormItem :label="$t('page.asset.host.cloud')" path="cloud">
        <NSelect v-model:value="model.cloud" :options="CloudPlatformOptions" />
      </NFormItem>
      <NFormItem :label="$t('page.asset.host.buyHostCount')">
        <NInput v-model:value="countStr" :placeholder="$t('page.asset.host.form.buyHostCount')" />
      </NFormItem>
    </NForm>
    <template #footer>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>
