<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { updateParamTemplate } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'ParamTemplateOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Omit<Api.OpsManage.ParamTemplate, 'status'> | null;
}

const props = defineProps<Props>();

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
    add: $t('page.opsManage.paramTemplate.addParamTemplate'),
    edit: $t('page.opsManage.paramTemplate.editParamTemplate')
  };
  return titles[props.operateType];
});

type Model = Omit<Api.OpsManage.ParamTemplate, 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    keyword: '',
    variable: ''
  };
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
  // 更新参数模板信息
  const { error: templateError } = await updateParamTemplate(model);
  if (templateError) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem :label="$t('page.opsManage.paramTemplate.keyword')" path="keyword">
          <NInput v-model:value="model.keyword" :placeholder="$t('page.opsManage.paramTemplate.form.keyword')" />
        </NFormItem>

        <NFormItem :label="$t('page.opsManage.paramTemplate.variable')" path="variable">
          <NInput v-model:value="model.variable" :placeholder="$t('page.opsManage.paramTemplate.form.variable')" />
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
