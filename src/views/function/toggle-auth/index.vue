<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLoading } from '@sa/hooks';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { useTabStore } from '@/store/modules/tab';
import { useAuth } from '@/hooks/business/auth';

const route = useRoute();
const appStore = useAppStore();
const authStore = useAuthStore();
const tabStore = useTabStore();
const { hasAuth } = useAuth();
const { loading, startLoading, endLoading } = useLoading();

type AccountKey = 'super' | 'admin' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  username: string;
  password: string;
}

const accounts = computed<Account[]>(() => [
  {
    key: 'super',
    label: $t('page.login.pwdLogin.superAdmin'),
    username: 'Super',
    password: '123456'
  },
  {
    key: 'admin',
    label: $t('page.login.pwdLogin.admin'),
    username: 'Admin',
    password: '123456'
  },
  {
    key: 'user',
    label: $t('page.login.pwdLogin.user'),
    username: 'User',
    password: '123456'
  }
]);

const loginAccount = ref<AccountKey>('super');

async function handleToggleAccount(account: Account) {
  loginAccount.value = account.key;

  startLoading();
  await authStore.login(account.username, account.password, false);
  tabStore.initTabStore(route);
  endLoading();
  appStore.reloadPage();
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :title="$t('route.function_toggle-auth')" :bordered="false" size="small" segmented class="card-wrapper">
      <NDescriptions bordered :column="1">
        <NDescriptionsItem :label="$t('page.manage.user.userRole')">
          <NSpace>
            <NTag v-for="role in authStore.userInfo.roles" :key="role">{{ role }}</NTag>
          </NSpace>
        </NDescriptionsItem>
        <NDescriptionsItem ions-item :label="$t('page.function.toggleAuth.toggleAccount')">
          <NSpace>
            <NButton
              v-for="account in accounts"
              :key="account.key"
              :loading="loading && loginAccount === account.key"
              :disabled="loading && loginAccount !== account.key"
              @click="handleToggleAccount(account)"
            >
              {{ account.label }}
            </NButton>
          </NSpace>
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>
    <NCard
      :title="$t('page.function.toggleAuth.authHook')"
      :bordered="false"
      size="small"
      segmented
      class="card-wrapper"
    >
      <NSpace>
        <NButton v-if="hasAuth('B_CODE1')">{{ $t('page.function.toggleAuth.superAdminVisible') }}</NButton>
        <NButton v-if="hasAuth('B_CODE2')">{{ $t('page.function.toggleAuth.adminVisible') }}</NButton>
        <NButton v-if="hasAuth('B_CODE3')">
          {{ $t('page.function.toggleAuth.adminOrUserVisible') }}
        </NButton>
      </NSpace>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
