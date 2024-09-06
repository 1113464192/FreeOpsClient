<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { $t } from '@/locales';
import { localStg } from '@/utils/storage';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();
const { formRef, validate } = useNaiveForm();

interface FormModel {
  username: string;
  password: string;
}

const model: FormModel = reactive({
  username: '',
  password: ''
});

const rememberMe = ref(false);

const checked = rememberMe;

const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules();

  return {
    username: formRules.username,
    password: formRules.pwd
  };
});

function handleCheckedChange(param: boolean) {
  rememberMe.value = param;
}

async function handleSubmit() {
  await validate();
  // 如果rememberMe是true，就保存用户名和密码在local中，下次登录时自动填充
  if (rememberMe.value === true) {
    localStg.set('username', model.username);
    localStg.set('loginRememberMe', true);
  } else {
    localStg.remove('username');
    localStg.remove('loginRememberMe');
  }
  await authStore.login(model.username, model.password);
}

// 在组件挂载时检查 localStorage 中是否有 username
onMounted(() => {
  const savedUsername = localStg.get('username');
  if (savedUsername) {
    model.username = savedUsername;
  }
  const savedRememberMe = localStg.get('loginRememberMe');
  if (savedRememberMe) {
    rememberMe.value = true;
  }
});
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <NFormItem path="username">
      <NInput v-model:value="model.username" :placeholder="$t('page.login.common.usernamePlaceholder')" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NSpace vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox :checked="checked" @update:checked="handleCheckedChange">
          {{ $t('page.login.pwdLogin.rememberMe') }}
        </NCheckbox>
      </div>
      <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
