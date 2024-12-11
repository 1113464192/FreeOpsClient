<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { fetchGetHomeInfo } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'CardData'
});

interface CardData {
  key: string;
  title: string;
  value: number;
  unit: string;
  color: {
    start: string;
    end: string;
  };
  icon: string;
}

const cardData = ref<CardData[]>([]);

onMounted(async () => {
  try {
    const { data, error } = await fetchGetHomeInfo();
    if (error) {
      window.$message?.error?.($t('request.error'));
      return;
    } // else if (!data.hostCount) {
    //   window.$message?.error?.($t('page.home.hostCount') + $t('common.error'));
    //   return;
    // } else if (!data.projectCount) {
    //   window.$message?.error?.($t('page.home.projectCount') + $t('common.error'));
    //   return;
    // } else if (!data.taskNeedApproveCount) {
    //   window.$message?.error?.($t('page.home.taskNeedApproveCount') + $t('common.error'));
    //   return;
    // } else if (!data.taskRunningCount) {
    //   window.$message?.error?.($t('page.home.taskRunningCount') + $t('common.error'));
    //   return;
    // }
    cardData.value = [
      {
        key: 'projectCount',
        title: $t('page.home.projectCount'),
        value: data.projectCount,
        unit: '',
        color: {
          start: '#ec4786',
          end: '#b955a4'
        },
        icon: 'arcticons:projectm'
      },
      {
        key: 'hostCount',
        title: $t('page.home.hostCount'),
        value: data.hostCount,
        unit: '',
        color: {
          start: '#865ec0',
          end: '#5144b4'
        },
        icon: 'ant-design:cloud-server-outlined'
      },
      {
        key: 'taskNeedApproveCount',
        title: $t('page.home.taskNeedApproveCount'),
        value: data.taskNeedApproveCount,
        unit: '',
        color: {
          start: '#fcbc25',
          end: '#f68057'
        },
        icon: 'material-symbols-light:order-approve-outline-rounded'
      },
      {
        key: 'taskRunningCount',
        title: $t('page.home.taskRunningCount'),
        value: data.taskRunningCount,
        unit: '',
        color: {
          start: '#26deca',
          end: '#26a69a'
        },
        icon: 'carbon:job-run'
      }
    ];
  } catch (error) {
    console.error('Failed to fetch home info:', error);
  }
});

interface GradientBgProps {
  gradientColor: string;
}

const [DefineGradientBg, GradientBg] = createReusableTemplate<GradientBgProps>();

function getGradientColor(color: CardData['color']) {
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`;
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <!-- define component start: GradientBg -->
    <DefineGradientBg v-slot="{ $slots, gradientColor }">
      <div class="rd-8px px-16px pb-4px pt-8px text-white" :style="{ backgroundImage: gradientColor }">
        <component :is="$slots.default" />
      </div>
    </DefineGradientBg>
    <!-- define component end: GradientBg -->

    <NGrid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <NGi v-for="item in cardData" :key="item.key">
        <GradientBg :gradient-color="getGradientColor(item.color)" class="flex-1">
          <h3 class="text-16px">{{ item.title }}</h3>
          <div class="flex justify-between pt-12px">
            <SvgIcon :icon="item.icon" class="text-32px" />
            <CountTo
              :prefix="item.unit"
              :start-value="1"
              :end-value="item.value"
              class="text-30px text-white dark:text-dark"
            />
          </div>
        </GradientBg>
      </NGi>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
