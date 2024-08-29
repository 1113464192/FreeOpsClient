<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'UserSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.SystemManage.UserSearchParams>('model', { required: true });

type RuleKey = Extract<keyof Api.SystemManage.UserSearchParams, 'userEmail' | 'userPhone'>;

const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  const { patternRules } = useFormRules(); // inside computed to make locale reactive

  return {
    userEmail: patternRules.email,
    userPhone: patternRules.phone
  };
});

// 计算属性：将 EnableStatus 类型从 number 转换为 string
const stringEnableStatusOptions = computed(() => {
  return enableStatusOptions
    .filter(option => option.value !== null)
    .map(option => ({
      ...option,
      value: option.value.toString()
    }));
});

// 计算属性：将 UserGender 类型从 number 转换为 string
const stringUserGenderOptions = computed(() => {
  return userGenderOptions
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
    <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="80">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.username')" path="username" class="pr-24px">
          <NInput v-model:value="model.username" :placeholder="$t('page.manage.user.form.username')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userGender')" path="userGender" class="pr-24px">
          <NSelect
            v-model:value="model.userGender"
            :placeholder="$t('page.manage.user.form.userGender')"
            :options="translateOptions(stringUserGenderOptions)"
            clearable
          />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.nickname')" path="nickname" class="pr-24px">
          <NInput v-model:value="model.nickname" :placeholder="$t('page.manage.user.form.nickname')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userPhone')" path="userPhone" class="pr-24px">
          <NInput v-model:value="model.userPhone" :placeholder="$t('page.manage.user.form.userPhone')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userEmail')" path="userEmail" class="pr-24px">
          <NInput v-model:value="model.userEmail" :placeholder="$t('page.manage.user.form.userEmail')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userStatus')" path="userStatus" class="pr-24px">
          <NSelect
            v-model:value="model.status"
            :placeholder="$t('page.manage.user.form.userStatus')"
            :options="translateOptions(stringEnableStatusOptions)"
            clearable
          />
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
