<template>
  <div>
    <div v-for="productCategory in products" class="oneCategory">
      <div class="categoryTitle">{{ productCategory.categoryTitle }}</div>
      <div v-for="product in productCategory.productItems" class="product">
        <p class="productTitle">
          {{ product.title }}
          <b>({{ product.productCount }})</b>
        </p>
        <b v-bind:class="{pricesUpped : isPricesUpped, pricesFelt : !isPricesUpped}"
           class="price">
          {{ product.price }}руб.</b>
        <q-btn v-if="product.isInTrash" class="toTrashBtn"
               color="blue-grey-4"
               icon="fas fa-trash-restore"
               size="8px"
               @click="this.removeProductFromTrashHandler(product.categoryId, product.productId)"/>
        <q-btn v-else-if="!product.isInTrash"
               class="toTrashBtn"
               color="secondary"
               icon="fas fa-trash"
               size="8px"
               @click="this.setToTrashHandler(product)"/>

      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue';
import {mapActions, mapGetters} from "vuex";


export default defineComponent({
  name: 'Home',
  methods: {
    ...mapActions({
      setProductToTrash: 'products/setProductToTrash',
      removeProductFromTrash: 'products/removeProductFromTrash',
    }),
    removeProductFromTrashHandler(categoryId, productId) {
      this.removeProductFromTrash({categoryId, productId})
    },
    setToTrashHandler(product) {
      this.setProductToTrash(product)
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/getProductsG',
      isPricesUpped: 'products/getIsPricesUpped'
    }),
  }
})
</script>

<style scoped>
.oneCategory {
  background-color: #f6f5f5;
  border: 1px solid black;
  margin: 3px;
  border-radius: 3px;
}

.categoryTitle {
  background-color: #d2dee2;
}

.product {
  display: flex;
  border: 1px solid black;
}

.productTitle {
  width: 85%;
  margin: 0;
}

.price {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
}


</style>
<style>
.pricesUpped {
  background-color: #8de07b;
}

.pricesFelt {
  background-color: #e58b8b;
}
</style>
