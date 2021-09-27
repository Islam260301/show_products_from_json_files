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
         title="Добавить продукт в корзину"
         @click="checkAndSet(product)"/>
</template>

<script>
import IncrementDecrement from './IncrementDecrement';
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
          this.triggerWarning(`Вы ен можете сохранить в корзину данное количество продутов!!!`)
        } else if (value > product.productCount) {
          this.triggerInfo(`Мы имеем лишь ${product.productCount} экземпляра данного продукта.`)
        } else if (value === 1) {
          this.setProductToTrash(product)
          this.triggerInfo(`Продукт успешно добавлен в корзину.`)
        } else if (value > 1 && value <= product.productCount) {
          const payload = {
            count: value,
            product
          }
          this.setCountOfProductInTrash(payload)
          this.triggerInfo(`Количество данного продукта в корзине обновлен на ${value}.`)
        } else {
          this.triggerWarning(`У нас какая-то ошибка.\n Просим прощения!!!`)
        }
      } else {
        this.triggerInfo(`Пожалуйста введите число!`)
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
