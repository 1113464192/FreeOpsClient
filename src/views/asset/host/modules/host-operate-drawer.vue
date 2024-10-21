<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { NInputNumber } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchAllProjects, updateHost } from '@/service/api';
import { CloudPlatformOptions } from '@/constants/constants';
import { $t } from '@/locales';

defineOptions({
  name: 'HostOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Omit<Api.AssetManage.Host, 'status'> | null;
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

const { defaultRequiredRule, patternRules } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.asset.host.addHost'),
    edit: $t('page.asset.host.editHost')
  };
  return titles[props.operateType];
});

type Model = Omit<Api.AssetManage.Host, 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    name: '',
    ipv4: '',
    ipv6: '',
    vip: '',
    zone: '',
    cloud: '',
    system: '',
    cores: 0,
    mem: 0,
    dataDisk: 0,
    projectId: 0
  };
}

type RuleKey = Extract<keyof Api.AssetManage.Host, 'ipv4' | 'ipv6' | 'vip'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  ipv4: patternRules.ipv4,
  ipv6: patternRules.ipv6,
  vip: defaultRequiredRule
};

const projectOptions: CommonType.Option<number>[] = reactive([]);
async function getAllProjects() {
  // request
  const { error, data } = await fetchAllProjects();
  if (error) {
    return;
  }

  const options = data.map((item: Pick<Api.AssetManage.Project, 'id' | 'name'>) => ({
    value: item.id,
    label: item.name
  }));
  projectOptions.splice(0, projectOptions.length, ...options);
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
  const { error: hostError } = await updateHost(model);
  if (hostError) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    getAllProjects();
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.asset.host.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.asset.host.form.name')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.cloud')" path="cloud">
          <NSelect
            v-model:value="model.cloud"
            :options="CloudPlatformOptions"
            :placeholder="$t('page.asset.host.form.cloud')"
          />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.ipv4')" path="ipv4">
          <NInput v-model:value="model.ipv4" :placeholder="$t('page.asset.host.form.ipv4')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.ipv6')" path="ipv6">
          <NInput v-model:value="model.ipv6" :placeholder="$t('page.asset.host.form.ipv6')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.vip')" path="vip">
          <NInput v-model:value="model.vip" :placeholder="$t('page.asset.host.form.vip')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.zone')" path="zone">
          <NInput v-model:value="model.zone" :placeholder="$t('page.asset.host.form.zone')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.system')" path="system">
          <NInput v-model:value="model.system" :placeholder="$t('page.asset.host.form.system')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.cores')">
          <NInputNumber v-model:value="model.cores" :placeholder="$t('page.asset.host.form.cores')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.mem')">
          <NInputNumber v-model:value="model.mem" :placeholder="$t('page.asset.host.form.mem')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.dataDisk')">
          <NInputNumber v-model:value="model.dataDisk" :placeholder="$t('page.asset.host.form.dataDisk')" />
        </NFormItem>

        <NFormItem :label="$t('page.asset.host.projectName')" path="projectId">
          <NSelect
            v-model:value="model.projectId"
            :options="projectOptions"
            :placeholder="$t('page.asset.host.form.projectName')"
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
