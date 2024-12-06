<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { useNaiveForm } from '@/hooks/common/form';
import { fetchGetSelfAllProjects } from '@/service/api';

defineOptions({
  name: 'ApproveSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.OpsManage.GetUserTaskPendingReq>('model', { required: true });

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

onMounted(async () => {
  await getProjectOptions();
});

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :title="$t('common.search')" :bordered="false" size="small" class="card-wrapper">
    <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.opsManage.taskLog.name')" path="name" class="pr-24px">
          <NInput v-model:value="model.taskName" :placeholder="$t('page.opsManage.taskLog.form.name')" />
        </NFormItemGi>
        <NFormItemGi span="20 s:10 m:5" :label="$t('page.opsManage.taskLog.project')" path="projectId" class="pr-24px">
          <NSelect v-model:value="model.projectId" filterable clearable :options="projectOptions" />
        </NFormItemGi>

        <NFormItemGi span="24 m:12" class="pr-24px">
          <NSpace class="w-full" justify="end">
            <NButton @click="reset">
              <template #icon>
                <icon-ic-round-refresh class="text-icon" />
              </template>
              {{ $t('common.reset') }}
            </NButton>
            <NButton type="primary" ghost @click="search">
              <template #icon>
                <icon-ic-round-search class="text-icon" />
              </template>
              {{ $t('common.search') }}
            </NButton>
          </NSpace>
        </NFormItemGi>
      </NGrid>
    </NForm>
  </NCard>
</template>

<style scoped></style>
