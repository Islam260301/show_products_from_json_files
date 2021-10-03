<template>
	<q-btn-toggle
					v-model="locale"
					class="my-custom-toggle languageToggle"
          size="sm"
					no-caps
					rounded
					unelevated
					toggle-color="cyan-5"
					color="white"
					text-color="cyan-5"
          :options="[
              { value: 'en-US', label: $t('langSelector.en') },
              { value: 'ru', label: $t('langSelector.ru') }
          ]"
          :model-value="locale"
	/>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: "LanguageSelector",
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";
.my-custom-toggle {
  border: 1px solid $cyan-5
}
</style>
