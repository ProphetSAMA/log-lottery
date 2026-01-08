<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const definiteTime = defineModel<number | null>('definiteTime', { required: true })
const winMusic = defineModel<boolean>('winMusic', { required: true })
const guaranteedMatchEnabled = defineModel<boolean>('guaranteedMatchEnabled', { required: true })
const guaranteedMatchThreshold = defineModel<number>('guaranteedMatchThreshold', { required: true })
const guaranteedMatchPersonIds = defineModel<string>('guaranteedMatchPersonIds', { required: true })

// 验证阈值范围
function validateThreshold() {
  if (guaranteedMatchThreshold.value < 1) {
    guaranteedMatchThreshold.value = 1
  } else if (guaranteedMatchThreshold.value > 100) {
    guaranteedMatchThreshold.value = 100
  } else if (!Number.isInteger(guaranteedMatchThreshold.value)) {
    guaranteedMatchThreshold.value = Math.floor(guaranteedMatchThreshold.value)
  }
}
</script>

<template>
  <fieldset class="p-4 border text-setting fieldset bg-base-200 border-base-300 rounded-box w-xs pb-10">
    <legend class="fieldset-legend">
      {{ t('table.abilitySetting') }}
    </legend>

    <label class="flex flex-row items-center form-control">
      <div class="">
        <div class="label flex flex-col justify-start items-start">
          <label class="label">
            <span class="label-text text-left">{{ t('table.timedStop') }}</span>
            <div class="tooltip" :data-tip="t('tooltip.timedStop')">
              <button class="btn btn-circle h-4 hover:bg-base-300">
                ?
              </button>
            </div>
          </label>
          <input
            v-model="definiteTime" type="number" :placeholder="t('placeHolder.timedStop')"
            class="w-full max-w-xs input input-bordered"
          >
        </div>
      </div>
    </label>
    <div class="flex items-center justify-between w-full max-w-xs gap-2 mb-3 form-control">
      <div class="label">
        <span class="label-text">{{ t('table.playWinMusic') }}</span>
      </div>
      <input
        type="checkbox" :checked="winMusic" class="border-solid checkbox checkbox-secondary border"
        @change="winMusic = !winMusic"
      >
    </div>
    <div class="flex items-center justify-between w-full max-w-xs gap-2 mb-3 form-control">
      <div class="label">
        <span class="label-text">{{ t('table.guaranteedMatch') }}</span>
        <div class="tooltip" :data-tip="t('tooltip.guaranteedMatch')">
          <button class="btn btn-circle h-4 hover:bg-base-300">
            ?
          </button>
        </div>
      </div>
      <input
        type="checkbox" :checked="guaranteedMatchEnabled" class="border-solid checkbox checkbox-secondary border"
        @change="guaranteedMatchEnabled = !guaranteedMatchEnabled"
      >
    </div>
    <label v-if="guaranteedMatchEnabled" class="flex flex-row items-center form-control">
      <div class="">
        <div class="label flex flex-col justify-start items-start">
          <label class="label">
            <span class="label-text text-left">{{ t('table.guaranteedMatchThreshold') }}</span>
            <div class="tooltip" :data-tip="t('tooltip.guaranteedMatchThreshold')">
              <button class="btn btn-circle h-4 hover:bg-base-300">
                ?
              </button>
            </div>
          </label>
          <input
            v-model.number="guaranteedMatchThreshold" 
            type="number" 
            min="1" 
            max="100"
            step="1"
            placeholder="5"
            class="w-full max-w-xs input input-bordered"
            @blur="validateThreshold"
          >
        </div>
      </div>
    </label>
    <label v-if="guaranteedMatchEnabled" class="flex flex-row items-center form-control">
      <div class="">
        <div class="label flex flex-col justify-start items-start">
          <label class="label">
            <span class="label-text text-left">{{ t('table.guaranteedPersonIds') }}</span>
            <div class="tooltip" :data-tip="t('tooltip.guaranteedPersonIds')">
              <button class="btn btn-circle h-4 hover:bg-base-300">
                ?
              </button>
            </div>
          </label>
          <input
            v-model="guaranteedMatchPersonIds" 
            type="text" 
            :placeholder="t('placeHolder.guaranteedPersonIds')"
            class="w-full max-w-xs input input-bordered"
          >
        </div>
      </div>
    </label>
  </fieldset>
</template>

<style scoped>

</style>
