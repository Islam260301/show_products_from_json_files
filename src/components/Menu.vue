<template>
  <div>

    <div class="menu">
      <q-btn-group class="menuButtons">
        <q-btn color="yellow"
               glossy
               icon="fas fa-gamepad"
               label="Home"
               push text-color="black"
               @click="this.$router.push('/').catch(() => {})"/>
        <q-btn color="amber"
               glossy
               icon="far fa-chart-bar"
               label="Cart"
               push text-color="black"
               @click="this.$router.push('/cart').catch(() => {})"/>
      </q-btn-group>
      <div class="dollarRateIcon">
        $
        <q-icon v-if="isPricesUpped"
                class="far fa-arrow-alt-circle-up pricesUpped"
                size="2rem"/>
        <q-icon v-else
                class="far fa-arrow-alt-circle-down pricesFelt"
                size="2rem"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Menu",
  computed: {
    ...mapGetters({
      isPricesUpped: 'products/getIsPricesUpped'
    })
  }
}

</script>

<style scoped>
.menu {
  display: flex;
  justify-content: center;
  height: 2rem;
  border-bottom: 1px solid black;
}

.menu .menuButtons {
  height: 2rem;
}

.dollarRateIcon {
position: absolute;
  right: 1rem;
}

.dollarRateIcon i {
  border-radius: 50%;

}



</style>
