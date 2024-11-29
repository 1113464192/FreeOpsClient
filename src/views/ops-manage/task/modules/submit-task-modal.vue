<script setup lang="ts">
import { reactive, shallowRef, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import {
  fetchGetTaskCommand,
  fetchGetTaskList,
  fetchGetTemplateList,
  fetchGetUserList,
  runTaskCheckScript,
  submitTask
} from '@/service/api';
import { $t } from '@/locales';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'SubmitTaskModal'
});

const showCommands = shallowRef<boolean>(false);

interface Props {
  /** the edit row data */
  rowData?: Omit<Api.OpsManage.Task, 'status'> | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const currentStep = shallowRef<number>(1);

const commands = shallowRef<string[]>([]);

const defaultTemplateIds = shallowRef<number[]>([]);

const { formRef, validate, restoreValidation } = useNaiveForm();

const title = $t('page.opsManage.task.submitTitle');

const model: Api.OpsManage.SubmitTask = reactive(createDefaultModel());

function createDefaultModel(): Api.OpsManage.SubmitTask {
  return {
    taskId: 0,
    execContent: '',
    checkResponse: '',
    templateIds: [],
    auditors: [],
    submitter: Number.parseInt(useAuthStore().userInfo.userId, 10)
  };
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
async function getTemplateOptions() {
  const { error, data } = await fetchGetTemplateList();
  if (!error) {
    const options = data.records
      .filter(item => defaultTemplateIds.value.includes(item.id))
      .map(item => ({
        label: item.name,
        value: item.id
      }));

    templateOptions.value = options;
  }
}

async function nextStep() {
  console.log('currentStep', currentStep.value);
  if (currentStep.value === 1) {
    const { data, error } = await runTaskCheckScript(props.rowData?.id || 0, model.execContent);
    if (error) {
      return;
    }
    model.checkResponse = data[0].response;
  }
  currentStep.value += 1;
}

async function prevStep() {
  currentStep.value -= 1;
}

async function generateCommands() {
  const { data, error } = await fetchGetTaskCommand(model.templateIds, model.execContent);
  if (error) {
    return;
  }
  commands.value = data;
  showCommands.value = true;
}

async function handleInitModel() {
  Object.assign(model, createDefaultModel());
  const { data, error } = await fetchGetTaskList({ id: props?.rowData?.id });
  if (error) {
    return;
  }
  console.log('data', data);
  Object.assign(model, data.records[0]);
  defaultTemplateIds.value = model.templateIds;
  console.log('init model', model);
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  console.log('model', model);
  // 更新操作模板信息
  const { error: taskError } = await submitTask(model);
  if (taskError) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    getTemplateOptions();
    getUserOptions();
    restoreValidation();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-1800px">
    <NSteps :current="currentStep">
      <NStep :title="$t('page.opsManage.task.execContent')" />
      <NStep :title="$t('page.opsManage.task.checkResponse')" />
      <NStep :title="$t('page.opsManage.task.submit')" />
    </NSteps>
    <div v-if="currentStep === 1">
      <NScrollbar class="h-680px pr-20px">
        <!-- 步骤 1 的内容 -->
        <NForm ref="formRef" :model="model">
          <NFormItem path="content">
            <NInput
              v-model:value="model.execContent"
              type="textarea"
              :autosize="{
                minRows: 12,
                maxRows: 24
              }"
              :placeholder="$t('page.opsManage.task.form.execContent')"
            />
          </NFormItem>
        </NForm>
      </NScrollbar>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton @click="nextStep">{{ $t('common.nextStep') }}</NButton>
      </NSpace>
    </div>
    <div v-if="currentStep === 2">
      <!-- 步骤 2 的内容 -->
      <NScrollbar class="h-680px pr-20px">
        <NForm ref="formRef" :model="model">
          <NFormItem path="content">
            <NInput
              v-model:value="model.checkResponse"
              type="textarea"
              :autosize="{
                minRows: 12,
                maxRows: 24
              }"
              :placeholder="$t('page.opsManage.task.form.checkResponse')"
            />
          </NFormItem>
        </NForm>
      </NScrollbar>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton @click="prevStep">{{ $t('common.previousStep') }}</NButton>
        <NButton @click="nextStep">{{ $t('common.nextStep') }}</NButton>
      </NSpace>
    </div>
    <div v-if="currentStep === 3">
      <!-- 步骤 3 的内容 -->
      <NScrollbar class="h-680px pr-20px">
        <NForm ref="formRef" :model="model">
          <NFormItem path="templateIds">
            <NSelect
              v-model:value="model.templateIds"
              filterable
              multiple
              :options="templateOptions"
              :placeholder="$t('page.opsManage.task.form.template')"
            />
          </NFormItem>
          <NFormItem :label="$t('page.opsManage.task.submitAuditor')" path="auditors">
            <NSelect
              v-model:value="model.auditors"
              filterable
              multiple
              :options="userOptions"
              :placeholder="$t('page.opsManage.task.form.submitAuditor')"
            />
          </NFormItem>
        </NForm>
      </NScrollbar>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton @click="generateCommands">{{ $t('common.show') }}</NButton>
        <NButton @click="prevStep">{{ $t('common.previousStep') }}</NButton>
        <NButton @click="handleSubmit">{{ $t('page.opsManage.task.submit') }}</NButton>
      </NSpace>
    </div>
  </NModal>
  <!-- 命令详情对话框 -->
  <NDialog v-model:show="showCommands" title="$t('page.opsManage.task.command')">
    <NScrollbar>
      <NList>
        <NListItem v-for="(command, index) in commands" :key="index">
          <NButton>{{ command }}</NButton>
        </NListItem>
      </NList>
    </NScrollbar>
    <NSpace justify="end" :size="16">
      <NButton @click="() => (showCommands = false)">{{ $t('common.close') }}</NButton>
    </NSpace>
  </NDialog>
</template>

<style scoped></style>
