<script setup lang="ts">
import { computed, reactive, ref, shallowRef, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { fetchAllHosts, fetchGetSelfAllProjects, updateGame } from '@/service/api';
import { gameStatusOptions, gameTypeOptions } from '@/constants/business';
import { $t } from '@/locales';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'GameOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.OpsManage.Game | null;
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
    add: $t('page.opsManage.game.addGame'),
    edit: $t('page.opsManage.game.editGame')
  };
  return titles[props.operateType];
});

const disabled = computed(() => props.operateType === 'edit');
const showSelectHost = shallowRef<boolean>(false);

type Model = Omit<Api.OpsManage.Game, 'projectName' | 'hostName' | 'ipv4'> & {
  actionType: number;
};

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    status: 2,
    type: 1,
    lbName: '',
    lbListenerPort: 0,
    serverPort: 0,
    crossId: 0,
    commonId: 0,
    projectId: 0,
    hostId: 0,
    actionType: 1
  };
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
    model.actionType = 2;
  }
}

const stringGameTypeOptions = computed(() => {
  return gameTypeOptions
    .filter(option => option.value !== null)
    .map(option => ({
      ...option,
      value: option.value.toString()
    }));
});

const stringGameStatusOptions = computed(() => {
  return gameStatusOptions
    .filter(option => option.value !== null)
    .map(option => ({
      ...option,
      value: option.value.toString()
    }));
});

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

// fetchAllHosts生成选项
const hostOptions: CommonType.Option<number>[] = reactive([]);
async function getAllHosts(value: number) {
  showSelectHost.value = true;
  // request
  const { error, data } = await fetchAllHosts(value);
  if (error) {
    return;
  }

  if (!data || data.length === 0) {
    hostOptions.splice(0, hostOptions.length);
  } else {
    const options = data.map((item: Pick<Api.AssetManage.Host, 'id' | 'name' | 'ipv4' | 'ipv6'>) => ({
      value: item.id,
      label: item.ipv4
    }));
    hostOptions.splice(0, hostOptions.length, ...options);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // 确保status和type是number类型
  model.status = Number(model.status) as Api.OpsManage.GameStatus;
  model.type = Number(model.type) as Api.OpsManage.GameType;
  console.log('model', model);
  // 更新项目信息
  const { error: gameError } = await updateGame(model);
  if (gameError) {
    return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    getProjectOptions();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model">
        <NFormItem :label="$t('page.opsManage.game.id')" path="id">
          <NInputNumber
            v-model:value="model.id"
            :placeholder="$t('page.opsManage.game.form.id')"
            :disabled="disabled"
          />
        </NFormItem>
        <NFormItem :label="$t('page.opsManage.game.type')" path="type">
          <NSelect
            v-model:value="model.type"
            :placeholder="$t('page.opsManage.game.search.type')"
            :options="translateOptions(stringGameTypeOptions)"
            clearable
            :disabled="disabled"
          />
        </NFormItem>
        <NFormItem :label="$t('page.opsManage.game.status')" path="status">
          <NSelect
            v-model:value="model.status"
            :placeholder="$t('page.opsManage.game.search.status')"
            :options="translateOptions(stringGameStatusOptions)"
            clearable
          />
        </NFormItem>
        <NFormItem :label="$t('page.opsManage.game.lbName')" path="lbName">
          <NInput v-model:value="model.lbName" :placeholder="$t('page.opsManage.game.form.lbName')" />
        </NFormItem>
        <NFormItem :label="$t('page.opsManage.game.lbListenerPort')" path="lbListenerPort">
          <NInputNumber
            v-model:value="model.lbListenerPort"
            :placeholder="$t('page.opsManage.game.form.lbListenerPort')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.opsManage.game.serverPort')" path="serverPort">
          <NInputNumber v-model:value="model.serverPort" :placeholder="$t('page.opsManage.game.form.serverPort')" />
        </NFormItem>
        <NFormItem :label="$t('page.opsManage.game.crossId')" path="crossId">
          <NInputNumber v-model:value="model.crossId" :placeholder="$t('page.opsManage.game.search.crossId')" />
        </NFormItem>
        <NFormItem :label="$t('page.opsManage.game.commonId')" path="commonId">
          <NInputNumber v-model:value="model.commonId" :placeholder="$t('page.opsManage.game.search.commonId')" />
        </NFormItem>
        <NFormItem :label="$t('page.opsManage.game.projectName')" path="projectId">
          <NSelect
            v-model:value="model.projectId"
            :options="projectOptions"
            :placeholder="$t('page.opsManage.game.form.projectName')"
            :disabled="disabled"
            @update:value="getAllHosts"
          />
        </NFormItem>
        <NFormItem v-if="showSelectHost" :label="$t('page.opsManage.game.hostIpv4')" path="hostId">
          <NSelect
            v-model:value="model.hostId"
            :options="hostOptions"
            :placeholder="$t('page.opsManage.game.form.hostIp')"
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
