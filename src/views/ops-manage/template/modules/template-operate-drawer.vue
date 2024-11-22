<!-- <script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { fetchGetSelfAllProjects, fetchGetTemplateList, updateTemplate } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'TemplateOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Omit<Api.OpsManage.Template, 'status'> | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const isEdit = computed(() => props.operateType === 'edit');

const { formRef, validate, restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.opsManage.template.addTemplate'),
    edit: $t('page.opsManage.template.editTemplate')
  };
  return titles[props.operateType];
});

type Model = Omit<Api.OpsManage.Template, 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    name: '',
    content: '',
    projectId: 0
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

async function getTemplateContent() {
  if (props.operateType === 'edit' && props.rowData) {
    const { error, data } = await fetchGetTemplateList({ id: model.id });

    if (!error) {
      model.content = data.records[0].content;
    }
  }
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
    console.log('init model', model);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  console.log('model', model);
  // 更新服务器信息
  const { error: templateError } = await updateTemplate(model);
  if (templateError) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    getProjectOptions();
    handleInitModel();
    getTemplateContent();
    restoreValidation();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-1100px">
    <NScrollbar class="h-680px pr-20px">
      <NForm ref="formRef" :model="model">
        <NFormItem :label="$t('page.opsManage.template.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.opsManage.template.form.name')" />
        </NFormItem>

        <NFormItem :label="$t('page.opsManage.template.content')" path="content">
          <NInput
            v-model:value="model.content"
            type="textarea"
            :autosize="{
              minRows: 8,
              maxRows: 16
            }"
            :placeholder="$t('page.opsManage.template.form.content')"
          />
        </NFormItem>

        <NFormItem :label="$t('page.opsManage.template.projectId')" path="projectId">
          <NSelect
            v-model:value="model.projectId"
            :options="projectOptions"
            :placeholder="$t('page.opsManage.template.form.projectId')"
          />
        </NFormItem>
      </NForm>
    </NScrollbar>
    <template #footer>
      <NSpace :size="26" justify="end">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style> -->
