<script setup lang="tsx">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { updateApi } from '@/service/api';

defineOptions({
  name: 'ApiOperateModal'
});

export type OperateType = NaiveUI.TableOperateType | 'addChild';

interface Props {
  /** the type of operation */
  operateType: OperateType;
  /** the edit menu data or the parent menu data when adding a child menu */
  rowData?: Api.SystemManage.ApiModel | null;
  /** all pages */
  allPages: string[];
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
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<OperateType, string> = {
    add: $t('page.manage.api.addApi'),
    addChild: $t('page.manage.api.addChildApi'),
    edit: $t('page.manage.menu.editMenu')
  };
  return titles[props.operateType];
});

const disabledApiGroup = computed(() => props.operateType !== 'add');

type Model = Omit<Api.SystemManage.ApiModel, 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    path: '',
    method: '',
    apiGroup: '',
    description: ''
  };
}

type RuleKey = Extract<keyof Model, 'path' | 'method' | 'apiGroup'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  path: defaultRequiredRule,
  method: defaultRequiredRule,
  apiGroup: defaultRequiredRule
};

const methodOptions: CommonType.Option[] = [
  {
    label: 'GET',
    value: 'GET'
  },
  {
    label: 'POST',
    value: 'POST'
  },
  {
    label: 'PUT',
    value: 'PUT'
  },
  {
    label: 'DELETE',
    value: 'DELETE'
  }
];

async function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (!props.rowData) return;

  if (props.operateType === 'addChild') {
    const { apiGroup } = props.rowData;

    Object.assign(model, { apiGroup });
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  if (model.id < 0) {
    window.$message?.error($t('common.invalidId'));
    return;
  }

  if (props.operateType === 'edit') {
    if (props.rowData?.id && props.rowData.id !== 0) {
      model.id = props.rowData.id;
    } else {
      window.$message?.error($t('common.invalidId'));
      return;
    }
  }

  console.log('model: ', model);

  const { error } = await updateApi(model);
  if (error) {
    return;
  }

  // request
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    // getRoleOptions();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-800px">
    <NScrollbar class="h-480px pr-20px">
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
        <NGrid responsive="screen" item-responsive>
          <NFormItemGi span="30 m:16" :label="$t('page.manage.api.path')" path="path">
            <NInput v-model:value="model.path" :placeholder="$t('page.manage.api.form.tip.path')" />
          </NFormItemGi>

          <NFormItemGi span="30 m:16" :label="$t('page.manage.api.description')" path="description">
            <NInput v-model:value="model.description" :placeholder="$t('page.manage.api.form.description')" />
          </NFormItemGi>

          <NFormItemGi span="30 m:16" :label="$t('page.manage.api.apiGroup')" path="apiGroup">
            <NInput
              v-model:value="model.apiGroup"
              :disabled="disabledApiGroup"
              :placeholder="$t('page.manage.api.form.tip.apiGroup')"
            />
          </NFormItemGi>

          <NFormItemGi span="30 m:16" :label="$t('page.manage.api.method')" path="method">
            <NSelect
              v-model:value="model.method"
              :options="methodOptions"
              :placeholder="$t('page.manage.api.form.method')"
            />
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NScrollbar>
    <template #footer>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
