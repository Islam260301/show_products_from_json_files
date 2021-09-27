<template>
  <div>
    <div v-for="productCategory in products" class="oneCategory">
      <div class="categoryTitle">{{ productCategory.categoryTitle }}</div>
      <div v-for="product in productCategory.productItems" class="product">
        <ProductItem :isEditing="this.currentEditingProductId === product.productId" :product="product"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ProductItemInput from "components/ProductItemInput";
import IncrementDecrement from "components/IncrementDecrement";
import ProductItem from "components/ProductItem";
import {getCurrentEditingProductId} from "src/store/products/getters";


export default {
  name: 'Home',
  components: {
    ProductItem,
    ProductItemInput,
    IncrementDecrement
  },
  data() {
    return {
      productCountInTrash: "",
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/getProductsG',
      currentEditingProductId: 'products/getCurrentEditingProductId',
    }),
  },

}
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

</style>
