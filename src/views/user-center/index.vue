<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { useAuthStore } from '@/store/modules/auth';
import { updateUserPassword } from '@/service/api';

const authStore = useAuthStore();

// 是否展开密码的input框
const isShowPwd = ref<Boolean>(false);
const newPassword = ref<string>('');
const changeShowPwdButtonContent = ref<string>('page.login.resetPwd.title');

function changeShowPwd() {
  isShowPwd.value = !isShowPwd.value;
  if (isShowPwd.value) {
    changeShowPwdButtonContent.value = 'common.cancel';
  } else {
    changeShowPwdButtonContent.value = 'page.login.resetPwd.title';
  }
}

async function handleResetPassword() {
  const userIdNumber = Number.parseInt(authStore.userInfo.userId, 10); // 10 表示十进制
  const { error } = await updateUserPassword({
    id: userIdNumber,
    newPassword: newPassword.value
  });
  if (!error) {
    window.$message?.success($t('common.updateSuccess'));
    newPassword.value = '';
    changeShowPwd();
  }
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :title="$t('route.user-center')" :bordered="false" size="small" segmented class="card-wrapper">
      <NDescriptions bordered :column="1">
        <NDescriptionsItem :label="$t('page.manage.user.username')">
          <NSpace>
            <NTag :key="authStore.userInfo.username">{{ authStore.userInfo.username }}</NTag>
          </NSpace>
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.user.userRole')">
          <NSpace>
            <NTag v-for="role in authStore.userInfo.roles" :key="role">{{ role }}</NTag>
          </NSpace>
        </NDescriptionsItem>
        <NDescriptionsItem ions-item :label="$t('page.login.resetPwd.title')">
          <NSpace>
            <NButton @click="changeShowPwd()">
              {{ $t(changeShowPwdButtonContent) }}
            </NButton>
            <NInputGroup v-if="isShowPwd">
              <NInput
                v-model:value="newPassword"
                type="password"
                show-password-on="click"
                placeholder="密码"
                :maxlength="18"
                :minlength="6"
              />
              <NButton type="primary" ghost @click="handleResetPassword()">
                {{ $t('common.confirm') }}
              </NButton>
            </NInputGroup>
          </NSpace>
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
