<template>
  <div class="product">
    <div class="productTitle">
      {{ product.title }}
    </div>
    <div class="productCount">
      <q-input
        model-value=""
        input-class="countInput"
        class="countInputWithLabel"
        :hint="`Max(${product.productCount})`"
        v-model="productCountInTrash"
        :no-error-icon="true"
        ref="productCountInTrash"
        :readonly="!isEditing"
        :rules="[ val => val && val > -1 && val <= product.productCount]"
        type="number"
        v-bind:class="{paragraph : !isEditing, countInput : isEditing}"
        @click="showInput"
        @focusout="(e) => focusOut(e, product.categoryId, product.productId, product.countInTrash)"/>
      <span>шт.</span>
    </div>
    <div class="price">
      {{ product.price }}руб.
    </div>
    <div>
      <button class="deleteBtn" @click="removeProductFromTrash({
      categoryId: product.categoryId,
      productId: product.productId
      })">Delete
      </button>
    </div>
  </div>
</template>

<script>


import {removeProductFromTrash, setCountOfProductInTrash} from "src/store/products/actions";
import {mapActions} from "vuex";

export default {
  name: "CartProductItem",
  props: {
    product: Object,
  },
  data() {
    return {
      isEditing: false,
      isValid: true,
      productCountInTrash: this.product.countInTrash
    }
  },
  methods: {
    ...mapActions({
      setCountOfProductInTrash: 'products/setCountOfProductInTrash',
      removeProductFromTrash: 'products/removeProductFromTrash'
    }),
    showInput() {
      this.isEditing = true
    },
    async focusOut(e, categoryId, productId, productCount) {
      const value = e.target.value
      const success = await this.$refs.productCountInTrash.validate()
      if (success && value!== 0) {
        this.isEditing = false
        this.setCountOfProductInTrash({count: Number(value), categoryId, productId})
      } else if(success && value === 0) {
        this.removeProductFromTrash({productId, categoryId})
      } else {
        this.productCountInTrash = productCount
        this.formHasError = true
      }
    },
  },
}
</script>

<style scoped>
.product {
  align-items: center;
  border-bottom: 1px solid #d1c031;
  display: flex;
  justify-content: space-between;
}

.productCount {
  display: flex;
  align-items: center;
}

.product span {
  height: 66%;
  align-items: center;
}

.paragraph {
  width: 3rem;
  border: none;
}

.countInputWithLabel {
  width: 4rem;
}

.countInput {
  -webkit-appearance: none;}

.price {
  height: 66%;
  background-color: #d5d3d3;
}



</style>
