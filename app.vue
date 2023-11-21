<template>
  <div>
    <ui-button />
    {{ $t('hello') }}
    <button
      v-for="l in availableLocales"
      :key="l.code"
      class="bg_primary"
      @click="setLocale(l.code)"
    >
      {{ l.code }}
    </button>
    <nuxt-page />
  </div>
</template>

<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value);
});
</script>
<style lang="scss"></style>
