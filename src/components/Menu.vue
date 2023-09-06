<template>
  <div class="container">
    <div class="menu">
      <div class="languageSelectorWrapper">
        <LanguageSelector/>
      </div>
      <q-btn-group v-model="page" class="menuButtons" shrink>
        <q-btn color="cyan-5"
               glossy
               icon="home"
               :label="$t('menu.home')"
               name="HomePage"
               push text-color="white"
               @click="this.$router.push('/').catch(() => {})"/>
        <q-btn color="cyan-5"
               glossy
               icon="fas fa-shopping-basket"
               :label="$t('menu.basket')"
               name="BasketPage"
               push text-color="white"
               @click="this.$router.push('/cart').catch(() => {})"/>
      </q-btn-group>
      <div class="dollarRateIcon">
        <div>
          <span>$</span>
          <q-icon v-else
                  class="far fa-arrow-alt-circle-down pricesFelt"
                  size="2rem"
                  :title="$t('menu.dollarRateFeltIconTitle')"/>
          <q-icon v-if="isPricesUpped"
                  class="far fa-arrow-alt-circle-up pricesUpped"
                  size="2rem"
                  :title="$t('menu.dollarRateUppedIconTitle')"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import LanguageSelector from "components/LanguageSelector";
import {ref} from "vue";

export default {
  name: "Menu",
  components: {
    LanguageSelector
  },
  computed: {
    ...mapGetters({
      isPricesUpped: 'products/getIsPricesUpped'
    })
  },
  setup() {
    return {
      page: ref(''),
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
  background-color: $cyan-2;

  .menu {
    margin: auto 4rem 1rem 4rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;

    .languageSelectorWrapper {
      margin: auto 0;
    }

    * {
      flex: 1;
    }

    .menuButtons {
      height: max-content;
      flex: 1.5;
      justify-content: center;
      box-shadow: none;
    }

    .dollarRateIcon {
      display: grid;
      align-items: center;

      div {
        display: flex;
        margin: auto 0 auto auto;
        width: min-content;
        align-items: center;
      }

      i {
        border-radius: 50%;
      }
    }
  }
}
</style>
