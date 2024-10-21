<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { updateProject } from '@/service/api';
import { CloudPlatformOptions } from '@/constants/constants';
import { $t } from '@/locales';

defineOptions({
  name: 'ProjectOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.AssetManage.Project | null;
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
    add: $t('page.asset.project.addProject'),
    edit: $t('page.asset.project.editProject')
  };
  return titles[props.operateType];
});

type Model = Omit<Api.AssetManage.Project, 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    name: '',
    backendVersion: '',
    frontendVersion: '',
    gameRange: '',
    crossRange: '',
    commonRange: '',
    oneGameMem: 0,
    oneCrossMem: 0,
    oneCommonMem: 0,
    cloudPlatform: ''
  };
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  console.log('model', model);
  // 更新项目信息
  const { error: projectError } = await updateProject(model);
  if (projectError) {
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
        <NFormItem :label="$t('page.asset.project.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.asset.project.form.name')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.backendVersion')" path="backendVersion">
          <NInput v-model:value="model.backendVersion" :placeholder="$t('page.asset.project.form.backendVersion')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.frontendVersion')" path="frontendVersion">
          <NInput v-model:value="model.frontendVersion" :placeholder="$t('page.asset.project.form.frontendVersion')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.gameRange')" path="gameRange">
          <NInput v-model:value="model.gameRange" :placeholder="$t('page.asset.project.form.gameRange')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.crossRange')" path="crossRange">
          <NInput v-model:value="model.crossRange" :placeholder="$t('page.asset.project.form.crossRange')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.commonRange')" path="commonRange">
          <NInput v-model:value="model.commonRange" :placeholder="$t('page.asset.project.form.commonRange')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.oneGameMem')" path="oneGameMem">
          <NInputNumber v-model:value="model.oneGameMem" :placeholder="$t('page.asset.project.form.oneGameMem')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.oneCrossMem')" path="oneCrossMem">
          <NInputNumber v-model:value="model.oneCrossMem" :placeholder="$t('page.asset.project.form.oneCrossMem')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.oneCommonMem')" path="oneCommonMem">
          <NInputNumber v-model:value="model.oneCommonMem" :placeholder="$t('page.asset.project.form.oneCommonMem')" />
        </NFormItem>
        <NFormItem :label="$t('page.asset.project.cloudPlatform')" path="cloudPlatform">
          <NSelect
            v-model:value="model.cloudPlatform"
            :options="CloudPlatformOptions"
            :placeholder="$t('page.asset.project.form.cloudPlatform')"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
