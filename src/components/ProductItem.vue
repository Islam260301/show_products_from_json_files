<template>
  <span class="productTitle">
          {{ product.title }}
          <b>({{ product.productCount }})</b>
  </span>
  <div class="countGroup">
    <IncrementDecrement ref="IncrementDecrementRef" :isEditing="isEditing" :product="product"/>
  </div>
  <b class="price"
     v-bind:class="{pricesUpped : isPricesUpped, pricesFelt : !isPricesUpped}">
    {{ product.price }}<small>руб.</small>
  </b>
  <q-btn class="toTrashBtn"
         color="secondary"
         icon="fas fa-shopping-basket"
         size="8px"
         title="Add this product to basket"
         @click="checkAndSet(product)"/>
</template>

<script>
import IncrementDecrement from './IncrementDecrement'
import {mapActions, mapGetters} from "vuex";
import {useQuasar} from "quasar";

export default {
  name: "ProductItem",
  components: {IncrementDecrement},
  props: {
    product: Object,
    isEditing: Boolean
  },
  data() {
    return {
      productCountInput: null
    }
  },
  methods: {
    ...mapActions({
      setProductToTrash: 'products/setProductToTrash',
      removeProductFromTrash: 'products/removeProductFromTrash',
      setCountOfProductInTrash: 'products/setCountOfProductInTrash',
      setCountValue: 'products/setCountValue',
    }),

    checkAndSet(product) {
      let unParsedValue = this.$refs.IncrementDecrementRef.$refs.inputCountRef.currentCountInput
      let value = parseInt(this.$refs.IncrementDecrementRef.$refs.inputCountRef.currentCountInput)
      if (!isNaN(value) && !isNaN(unParsedValue)) {
        if (value <= 0) {
          this.triggerWarning(`You can't buy ${value} product!!!`)
        } else if (value > product.productCount) {
          this.triggerInfo(`We have just ${product.productCount} of this product`)
        } else if (value === 1) {
          this.setProductToTrash(product)
          this.triggerInfo(`Product successfully added to basket.`)
        } else if (value > 1 && value <= product.productCount) {
          const payload = {
            count: value,
            product
          }
          this.setCountOfProductInTrash(payload)
          this.triggerInfo(`You are successfully added to basket ${value} of this product.`)
        } else {
          this.triggerWarning(`We have a some errors!!! Sorry!`)
        }
      } else {
        this.triggerInfo(`Please, type number!`)
      }
    },
  },
  computed: {
    ...mapGetters({
      products: 'products/getProductsG',
      isPricesUpped: 'products/getIsPricesUpped',
      countValue: 'products/getCountValue',
    }),
  },
  setup() {
    const $q = useQuasar()

    return {
      triggerWarning(message) {
        $q.notify({
          position: 'top-right',
          timeout: 1500,
          color: 'warning',
          message: message
        })
      },
      triggerInfo(message) {
        $q.notify({
          position: 'top-right',
          timeout: 1500,
          color: 'info',
          message: message
        })
      },
    }
  },
}
</script>

<style scoped>

.productTitle {
  width: 85%;
  margin: 0;
}

.price {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 5rem;
  margin: 0 1rem;
}

</style>

<style>
.pricesUpped {
  background-color: #e58b8b;
}

.pricesFelt {
  background-color: #8de07b;
}

.countGroup {
  display: flex;
}

</style>
