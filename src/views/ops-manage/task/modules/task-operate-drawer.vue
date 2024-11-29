<script setup lang="ts">
import { computed, reactive, shallowRef, watch } from 'vue';
import { yesOrNoOptions } from '@/constants/business';
import { useNaiveForm } from '@/hooks/common/form';
import {
  fetchAllHosts,
  fetchGetSelfAllProjects,
  fetchGetTaskList,
  fetchGetTemplateList,
  fetchGetUserList,
  updateTask
} from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'TaskOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Omit<Api.OpsManage.Task, 'status'> | null;
}

const props = defineProps<Props>();

console.log('props', props);

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.opsManage.task.addTask'),
    edit: $t('page.opsManage.task.editTask')
  };
  return titles[props.operateType];
});

type Model = Omit<Api.OpsManage.Task, 'status' | 'projectName' | 'hostName'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    name: '',
    checkTemplateId: 0,
    templateIds: [],
    auditors: [],
    hostId: 0,
    isIntranet: false,
    isConcurrent: false,
    projectId: 0
  };
}

const disabled = shallowRef<boolean>(false);
const isIntranet = shallowRef<string>('');
const isConcurrent = shallowRef<string>('');

const projectOptions = shallowRef<CommonType.Option<number>[]>([]);
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

const userOptions = shallowRef<CommonType.Option<number>[]>([]);
async function getUserOptions() {
  const { error, data } = await fetchGetUserList();

  if (!error) {
    const options = data.records.map(item => ({
      label: item.username,
      value: item.id
    }));

    userOptions.value = options;
  }
}

const templateOptions = shallowRef<CommonType.Option<number>[]>([]);
async function getTemplateOptions(id: number) {
  const { error, data } = await fetchGetTemplateList({ projectId: id });

  if (!error) {
    const options = data.records.map(item => ({
      label: item.name,
      value: item.id
    }));

    templateOptions.value = options;
  }
}

const hostOption = shallowRef<CommonType.Option<number>[]>([]);
async function getHostOptions(id: number) {
  const { error, data } = await fetchAllHosts(id);
  if (!error) {
    const options = data.map(item => ({
      label: item.ipv4,
      value: item.id
    }));

    hostOption.value = options;
  }
}

async function projectIdCallback(id: number) {
  await getTemplateOptions(id);
  await getHostOptions(id);
  disabled.value = false;
}

async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    projectIdCallback(props.rowData.projectId);
    const { data, error } = await fetchGetTaskList({ id: props.rowData.id });
    if (error) {
      return;
    }
    console.log('data', data);
    Object.assign(model, data.records[0]);
    isIntranet.value = model.isIntranet ? '1' : '2';
    isConcurrent.value = model.isConcurrent ? '2' : '2';
    console.log('init model', model);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  if (!['1', '2'].includes(isIntranet.value) || !['1', '2'].includes(isConcurrent.value)) {
    window.$message?.error($t('page.opsManage.task.error.radioValueError'));
    return;
  }
  model.isIntranet = isIntranet.value === '1';
  model.isConcurrent = isConcurrent.value === '1';
  console.log('model', model);
  // 更新操作模板信息
  const { error: taskError } = await updateTask(model);
  if (taskError) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    getProjectOptions();
    getUserOptions();
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem :label="$t('page.opsManage.task.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.opsManage.task.form.name')" />
        </NFormItem>

        <NFormItem :label="$t('page.opsManage.task.project')" path="projectId">
          <NSelect
            v-model:value="model.projectId"
            filterable
            :options="projectOptions"
            :placeholder="$t('page.opsManage.task.form.project')"
            @update:value="projectIdCallback"
          />
        </NFormItem>

        <NFormItem :label="$t('page.opsManage.task.host')" path="hostId">
          <NSelect
            v-model:value="model.hostId"
            filterable
            :options="hostOption"
            :disabled="disabled"
            :placeholder="$t('page.opsManage.task.form.host')"
          />
        </NFormItem>

        <NFormItem :label="$t('page.opsManage.task.checkTemplate')" path="checkTemplateId">
          <NSelect
            v-model:value="model.checkTemplateId"
            filterable
            :disabled="disabled"
            :options="templateOptions"
            :placeholder="$t('page.opsManage.task.form.checkTemplate')"
          />
        </NFormItem>

        <NFormItem :label="$t('page.opsManage.task.template')" path="templateIds">
          <NSelect
            v-model:value="model.templateIds"
            filterable
            multiple
            :disabled="disabled"
            :options="templateOptions"
            :placeholder="$t('page.opsManage.task.form.template')"
          />
        </NFormItem>

        <NFormItem :label="$t('page.opsManage.task.auditor')" path="auditors">
          <NSelect
            v-model:value="model.auditors"
            filterable
            multiple
            :options="userOptions"
            :placeholder="$t('page.opsManage.task.form.auditor')"
          />
        </NFormItem>

        <NFormItem span="24 m:12" :label="$t('page.opsManage.task.isIntranet')" path="isIntranet">
          <NRadioGroup v-model:value="isIntranet">
            <NRadio v-for="item in yesOrNoOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem span="24 m:12" :label="$t('page.opsManage.task.isConcurrent')" path="isConcurrent">
          <NRadioGroup v-model:value="isConcurrent">
            <NRadio v-for="item in yesOrNoOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="26" justify="end">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
