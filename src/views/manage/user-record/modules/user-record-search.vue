<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { fetchGetUserRecordMonths } from '@/service/api';
import { MethodOptions } from '@/constants/constants';
defineOptions({
  name: 'UserRecordSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.SystemManage.UserRecordSearchParams>('model', { required: true });

const statusOptions: CommonType.Option[] = [
  { label: '2xx', value: '2%' },
  { label: '3xx', value: '3%' },
  { label: '4xx', value: '4%' },
  { label: '5xx', value: '5%' }
];
async function getUserRecordDate(): Promise<string[]> {
  const { data, error } = await fetchGetUserRecordMonths();
  if (error || !data || !data.dates) {
    return [];
  }
  return data.dates.length > 0 ? data.dates : [];
}

const dates = ref<string[]>([]);
const dateOptions = ref<CommonType.Option[]>([]);

onMounted(async () => {
  dates.value = await getUserRecordDate();
  dateOptions.value = dates.value.map(date => ({ label: date, value: date }));
});

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <NCard :title="$t('common.search')" :bordered="false" size="small" class="card-wrapper">
    <NForm :model="model" label-placement="left" :label-width="80">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.userRecord.username')" path="username" class="pr-24px">
          <NInput v-model:value="model.username" :placeholder="$t('page.manage.userRecord.form.username')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.userRecord.ip')" path="ip" class="pr-24px">
          <NInput v-model:value="model.ip" :placeholder="$t('page.manage.userRecord.form.ip')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.userRecord.method')" path="method" class="pr-24px">
          <NSelect
            v-model:value="model.method"
            :placeholder="$t('page.manage.userRecord.form.method')"
            :options="MethodOptions"
            clearable
          />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.userRecord.status')" path="status" class="pr-24px">
          <NSelect
            v-model:value="model.status"
            :placeholder="$t('page.manage.userRecord.form.status')"
            :options="statusOptions"
            clearable
          />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.userRecord.date')" path="date" class="pr-24px">
          <NSelect
            v-model:value="model.date"
            :placeholder="$t('page.manage.userRecord.form.date')"
            :options="dateOptions"
            clearable
          />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6">
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
