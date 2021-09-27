<template>
  <div class="incrementDecrementBtns">
    <q-btn  color="cyan-5" @click="setCountInput('-')">-
    </q-btn>
    <ProductItemInput ref="inputCountRef"
                      :isEditing="isEditing"
                      :product="product"
                      :isInCart="isInCart"/>
    <q-btn color="cyan-5" @click="setCountInput('+')">+
    </q-btn>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {useQuasar} from "quasar";
import ProductItemInput from '../components/ProductItemInput'

export default {
  name: "IncrementDecrement",
  components: {
    ProductItemInput
  },
  props: {
    product: Object,
    isEditing: Boolean,
    isInCart: Boolean
  },
  data() {
    return {}
  },

  methods: {
    ...mapActions({
      setCountOfProductInTrash: 'products/setCountOfProductInTrash',
      removeProductFromTrash: 'products/removeProductFromTrash',
      setCurrentEditingProductId: 'products/setCurrentEditingProductId',
    }),
    setCountInput(operation) {
      this.setCurrentEditingProductId(this.product.productId)
      let value = null
      if(operation === "+") {
        value = parseInt(this.$refs.inputCountRef.currentCountInput) + 1
        if(value > 0 && value < this.product.productCount && this.isInCart) {
          this.$refs.inputCountRef.currentCountInput = parseInt(this.$refs.inputCountRef.currentCountInput) + 1
        }else if(!this.isInCart)  {
          this.$refs.inputCountRef.currentCountInput = parseInt(this.$refs.inputCountRef.currentCountInput) + 1
        }
      }else {
        value = parseInt(this.$refs.inputCountRef.currentCountInput) - 1
        if(value > 0 && value < this.product.productCount && this.isInCart) {
          this.$refs.inputCountRef.currentCountInput = parseInt(this.$refs.inputCountRef.currentCountInput) - 1
        }else if(!this.isInCart)  {
          this.$refs.inputCountRef.currentCountInput = parseInt(this.$refs.inputCountRef.currentCountInput) - 1
        }
      }
      if(this.isInCart) {
        if (value === 0) {
          let payload = {
            productId: this.product.productId,
            categoryId: this.product.categoryId,
          }
          this.confirmDelete(payload)
        } else if (value > 0 && this.product.productCount >= value) {
          let payload = {
            count: value,
            product: this.product
          }
          this.setCountOfProductInTrash(payload)
          if (value === 1) {
            this.triggerInfo(`Продукт успешно добавлен в корзину.`)
          } else {
            if(!this.isInCart) {
              this.triggerInfo(`Количество данного продекта в корзине обновлен на ${value}.`)
            }
          }
        } else if (value === -1) {
          this.triggerWarning(`Вы не можете добавить в корзину меньшее количество продукта чем 0.`)
        } else if (value > this.product.productCount) {
          this.triggerInfo(`Это максимальное количество данного продукта. \n Просим прощения)`)
        } else {
          this.triggerWarning(`У нас какая-то ошибка.\n Просим прощения!!!`)
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      countValue: 'products/getCountValue',
    })
  },
  setup() {
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
      triggerWarning(message) {
        $q.notify({
          position: 'top-right',
          timeout: 1500,
          color: 'warning',
          message: message,
          size: 'small'
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
  }
}
</script>

<style scoped>
.incrementDecrementBtns {
  display: flex;
  margin: auto 2px;
  align-items: center;
}

.incrementDecrementBtns button {
  text-align: center;
  border-radius: 10%;
  height: 1.3rem;
  padding: 0;
  margin: 2px;
  font-size: xx-small;
  width: 1.3rem;
  background-color: #e5e3e3;
  border: 1px solid #c1dabb;
}
</style>
