<template>
  <q-input
    ref="productCountInTrashRef"
    :borderless="true"
    :no-error-icon="true"
    :placeholder="product.countInTrash"
    :readonly="!isEditing"
    hide-bottom-space
    v-model.number="currentCountInput"
    input-class="countInput"
    type="text"
    v-bind:class="{paragraph : !isEditing, countInput : isEditing}"
    @click="showInput(product.productId)"
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {useQuasar} from "quasar";
import {setCountValue, setCurrentEditingProductId} from "src/store/products/actions";
import {getCountValue} from "src/store/products/getters";

export default {
  name: "ProductItemInput",
  props: {
    product: Object,
    isInCart: Boolean,
    isEditing: Boolean
  },
  data() {
    return {
      inputValue: this.countValue,
      currentCountInput: this.product.countInTrash === 0 ? "1" : this.product.countInTrash,
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      setCountOfProductInTrash: 'products/setCountOfProductInTrash',
      removeProductFromTrash: 'products/removeProductFromTrash',
      setCountValue: 'products/setCountValue',
      setCurrentEditingProductId: 'products/setCurrentEditingProductId',
    }),

    showInput(productId) {
      this.setCurrentEditingProductId(productId)
    },
  },
  computed: {
    ...mapGetters({
      countValue: 'products/getCountValue'
    })
  },
  setup() {
    const $q = useQuasar()

    return {
      triggerWarning(message) {
        $q.notify({
          position: 'top-right',
          timeout: 2500,
          color: 'warning',
          message: message
        })
      },
      triggerInfo(message) {
        $q.notify({
          position: 'top-right',
          timeout: 2500,
          color: 'info',
          message: message
        })
      },
    }
  }
}
</script>

<style>

.paragraph {
  display: flex;
  justify-content: center;
  width: 3rem;
  height: 2rem;
  padding: 0;
  align-items: center;
  text-align: center;
}

.countInput {
  height: 2rem;
  text-align: center;
}

::-webkit-input-placeholder {
  text-align: center;
}

:-moz-placeholder {
  text-align: center;
}

.q-field__control-container col {
  height: 2rem;
}

</style>


<style scoped>
.countInput {
  width: 3rem;
  border: 1px solid #565454;
  border-radius: 2px;
  display: flex;
  margin: auto 0;
  padding: 0;
  background-color: #fff;
}
</style>
