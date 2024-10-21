<script setup lang="ts">
import { computed } from 'vue';
import { NInputNumber } from 'naive-ui';
import { $t } from '@/locales';
import { useNaiveForm } from '@/hooks/common/form';
import { gameStatusOptions, gameTypeOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'GameSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.OpsManage.GameSearchParams>('model', { required: true });

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
    <NForm ref="formRef" :model="model" label-placement="left" :label-width="90">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="15 s:8 m:4" :label="$t('page.opsManage.game.id')" path="id" class="pr-24px">
          <NInputNumber v-model:value="model.id" :placeholder="$t('page.opsManage.game.search.id')" />
        </NFormItemGi>
        <NFormItemGi span="15 s:8 m:4" :label="$t('page.opsManage.game.type')" path="type" class="pr-24px">
          <NSelect
            v-model:value="model.type"
            :placeholder="$t('page.opsManage.game.search.type')"
            :options="translateOptions(stringGameTypeOptions)"
            clearable
          />
        </NFormItemGi>
        <NFormItemGi span="15 s:8 m:4" :label="$t('page.opsManage.game.status')" path="status" class="pr-24px">
          <NSelect
            v-model:value="model.status"
            :placeholder="$t('page.opsManage.game.search.status')"
            :options="translateOptions(stringGameStatusOptions)"
            clearable
          />
        </NFormItemGi>
        <NFormItemGi
          span="24 s:12 m:6"
          :label="$t('page.opsManage.game.projectName')"
          path="projectName"
          class="pr-24px"
        >
          <NInput v-model:value="model.projectName" :placeholder="$t('page.opsManage.game.search.projectName')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.opsManage.game.hostName')" path="hostName" class="pr-24px">
          <NInput v-model:value="model.hostName" :placeholder="$t('page.opsManage.game.search.hostName')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.asset.host.ipv4')" path="ipv4" class="pr-24px">
          <NInput v-model:value="model.ipv4" :placeholder="$t('page.asset.host.search.ipv4')" />
        </NFormItemGi>
        <NFormItemGi span="15 s:8 m:4" :label="$t('page.opsManage.game.crossId')" path="crossId" class="pr-24px">
          <NInputNumber v-model:value="model.crossId" :placeholder="$t('page.opsManage.game.search.crossId')" />
        </NFormItemGi>
        <NFormItemGi span="15 s:8 m:4" :label="$t('page.opsManage.game.commonId')" path="commonId" class="pr-24px">
          <NInputNumber v-model:value="model.commonId" :placeholder="$t('page.opsManage.game.search.commonId')" />
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
