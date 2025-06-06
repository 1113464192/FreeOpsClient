<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { useNaiveForm } from '@/hooks/common/form';
import { CloudPlatformOptions } from '@/constants/constants';
import { fetchGetSelfAllProjects } from '@/service/api';

defineOptions({
  name: 'HostSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const projectOptions = ref<CommonType.Option<number>[]>([]);

const model = defineModel<Api.AssetManage.HostSearchParams>('model', { required: true });

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
        <NFormItemGi span="18 s:9 m:5" :label="$t('page.asset.host.name')" path="name" class="pr-24px">
          <NInput v-model:value="model.name" :placeholder="$t('page.asset.host.search.name')" />
        </NFormItemGi>
        <NFormItemGi span="15 s:8 m:4" :label="$t('page.asset.host.ipv4')" path="ipv4" class="pr-24px">
          <NInput v-model:value="model.ipv4" :placeholder="$t('page.asset.host.search.ipv4')" />
        </NFormItemGi>
        <NFormItemGi span="20 s:10 m:5" :label="$t('page.asset.host.ipv6')" path="ipv6" class="pr-24px">
          <NInput v-model:value="model.ipv6" :placeholder="$t('page.asset.host.search.ipv6')" />
        </NFormItemGi>
        <NFormItemGi span="15 s:8 m:4" :label="$t('page.asset.host.vip')" path="vip" class="pr-24px">
          <NInput v-model:value="model.vip" :placeholder="$t('page.asset.host.search.vip')" />
        </NFormItemGi>
        <NFormItemGi span="10 s:5 m:3" :label="$t('page.asset.host.zone')" path="zone" class="pr-24px">
          <NInput v-model:value="model.zone" :placeholder="$t('page.asset.host.search.zone')" />
        </NFormItemGi>
        <NFormItemGi span="10 s:5 m:3" :label="$t('page.asset.host.cloud')" path="cloud" class="pr-24px">
          <NSelect
            v-model:value="model.cloud"
            :options="CloudPlatformOptions"
            :placeholder="$t('page.asset.host.search.cloud')"
          />
        </NFormItemGi>
        <NFormItemGi span="18 s:9 m:5" :label="$t('page.asset.host.system')" path="system" class="pr-24px">
          <NInput v-model:value="model.system" :placeholder="$t('page.asset.host.search.system')" />
        </NFormItemGi>
        <NFormItemGi span="18 s:9 m:5" :label="$t('page.asset.host.projectName')" path="projectId" class="pr-24px">
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
