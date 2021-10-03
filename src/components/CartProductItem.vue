<template>
  <div class="product">
    <div class="productTitle">
      {{ product.title }}
      <b>({{product.productCount}})</b>
    </div>
    <div class="productCount">
      <IncrementDecrement :isInCart="true" :isEditing="isEditing" :product="product"/>
      <span>шт.</span>
    </div>
    <div class="price">
      {{ product.price }}<small>руб.</small>
    </div>
    <div>
      <q-btn color="deep-orange-6"
             class="deleteBtn"
             @click="removeProductFromTrashHandler({
                  categoryId: product.categoryId,
                  productId: product.productId
      })">Удалить
      </q-btn>
    </div>
  </div>
</template>

<script>
import {removeProductFromTrash} from "src/store/products/actions";
import {mapActions} from "vuex";
import ProductItemInput from "components/ProductItemInput";
import IncrementDecrement from "components/IncrementDecrement";
import {useQuasar} from "quasar";
import {defineComponent} from "vue";

export default defineComponent({
  name: "CartProductItem",
  components: {ProductItemInput, IncrementDecrement},
  props: {
    product: Object,
    isEditing: Boolean
  },
  data() {
    return{
    }
  },
  methods: {
    ...mapActions({
      removeProductFromTrash: 'products/removeProductFromTrash'
    }),
    removeProductFromTrashHandler(payload) {
      this.confirmDelete(payload)
    }
  },
  setup () {
    const $q = useQuasar()

    return {
      confirmDelete(payload) {
        $q.dialog({
          title: 'Подтверждение',
          message: 'Вы действительно хотите удалить данный продукт с корзины?',
          persistent: true,
          ok: "Да",
          cancel: "Нет"
        }).onOk(() => {
          this.removeProductFromTrash(payload)
          this.triggerInfo(`Продукт успешно удален с корзины.`)
        })
      },
      triggerInfo (message) {
        $q.notify({
          position: 'top-right',
          timeout: 1500,
          color: 'info',
          message: message
        })
      },
    }
  }
})
</script>

<style scoped>
.product {
  align-items: center;
  /*border-bottom: 1px solid #d1c031;*/
  display: flex;
  border-top: 1px solid #d1c031;


}

.productTitle {
  font-size: small;
}

.price {
  font-size: small;
}

.productCount {
  display: flex;
  align-items: center;
}
.productCount span {
  height: min-content;
}

.deleteBtn {
  font-size: 8px;
}

</style>
