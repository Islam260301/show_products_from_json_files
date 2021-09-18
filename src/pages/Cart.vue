<template>
  <div class="cart">
    <div v-if="productsInTrash[0]" class="product">
      <div class="productTitle">
        ProductTitle
      </div>
      <div class="productCount">
        <p class="count">count</p>
      </div>
      <div class="price">
        price
      </div>
      <span class="sum">{{ totalSum }}руб.</span>
    </div>
    <h5 v-else class="noProductsTitle">you have no products in the basket</h5>
    <CartProductItem v-for="product in this.productsInTrash" :product="product"/>
  </div>
</template>

<script>
import CartProductItem from "components/CartProductItem";
import {mapGetters} from "vuex";
import {getProductsInTrash} from "src/store/products/getters";

export default {
  name: "Cart",
  components: {
    CartProductItem
  },
  computed: {
    ...mapGetters({
      productsInTrash: 'products/getProductsInTrash',
    }),
    totalSum() {
      return this.productsInTrash.reduce((accum, product) => {
        return accum + (product.price * product.countInTrash)
      }, 0)
    }
  }
}
</script>

<style>
.cart {
  margin: 0 auto;
  width: 95vw;
}

.noProductsTitle {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product {
  display: flex;
}

.productTitle {
  width: 50%;
}

.productCount {
  width: 20%;
}

.sum {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: #f3a036;
}


</style>
