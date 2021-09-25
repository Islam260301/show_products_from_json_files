<template>
  <div class="cart">
    <div v-if="productsInTrash.length" class="product">
      <div class="productTitle">
        Наименование продукта
      </div>
      <div class="productCount">
        <p class="count">Кол-во в корзине</p>
      </div>
      <div class="price">
        Цена
      </div>
    </div>
    <h5 v-else class="noProductsTitle">К сожелению у вас нет продуктов в корзине</h5>
    <CartProductItem v-for="product in this.productsInTrash"
                     :isEditing="this.currentEditingProductId === product.productId"
                     :product="product"/>
    <div class="sumWrapper">
      <span class="sum">Общая сумма: {{ totalSum }}руб.</span>
    </div>
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
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters({
      productsInTrash: 'products/getProductsInTrash',
      currentEditingProductId: 'products/getCurrentEditingProductId',
    }),
    totalSum() {
      return this.productsInTrash.reduce((accum, product) => {
        return accum + product.price
      }, 0)
    }
  }
}
</script>

<style>
.cart {
  margin: 0 auto;
  font-size: small;
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
  width: 60%;
}

.productCount {
  width: 20%;
}

.price {
  width: 10%;
}

.sumWrapper {
  position: fixed;
  bottom: 1rem;
  right: 0;
  left: 0;
  display: flex;
  align-self: flex-end;
  margin: auto 2.5rem;
}

.sum {
  width: 100%;
  border-top: 1px solid black;
  text-align: right;
  color: #da9339;
}


</style>
