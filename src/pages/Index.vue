<template>
  <Menu/>
  <div id="container">
    <router-view/>
  </div>
</template>
<script>
import {defineComponent} from 'vue';
import {mapActions, mapGetters} from "vuex";
import data from "assets/data/data.json";
import names from "assets/data/names.json";
import Menu from "components/Menu";
import {getCountOfProductsInTrash} from "src/store/products/getters";


export default defineComponent({
  name: 'App',
  components: {
    Menu
  },
  data() {
    return {
      data: data.Value.Goods,
      names: names,
    }
  },
  methods: {
    ...mapActions({
      setProductsWithCategory: 'products/setProductsWithCategory',
      setDollarRate: 'products/setDollarRate'
    }),
    setRandomRateOfDollar() {
      let min = Math.ceil(20);
      let max = Math.floor(80);
      this.setDollarRate(Math.floor(Math.random() * (max - min)) + min)
    },
    getProductsFromData() {
      setTimeout(this.getProductsFromData, 15000)
      this.setRandomRateOfDollar()
      let categoryIds = Object.keys(this.names)
      let categoryTitles = Object.values((this.names))
      const categories = categoryTitles.map((categoryTitle, i) => {
        let categoryItem = {
          categoryId: categoryIds[i],
          categoryTitle: categoryTitle["G"],
          productItems: []
        }
        this.data.filter(product => {
          return product["G"].toString() === categoryIds[i]
        }).forEach(product => {
          let isInTrash = this.getCountOfProductsInTrash[product["T"]]
          categoryItem.productItems = [...categoryItem.productItems,
            {
              categoryId: categoryIds[i],
              title: this.names[categoryItem.categoryId]["B"][product["T"]]["N"],
              price: Math.round(product["C"] * this.dollarRate * 100) / 100,
              initialPrice: product["C"],
              productId: product["T"],
              productCount: product["P"],
              isInTrash: !!isInTrash,
              countInTrash: !isInTrash ? 0 : isInTrash.count
            }
          ]
        })
        if (categoryItem.productItems.length > 0) {
          return categoryItem
        }
      }).filter(i => i)
      this.setProductsWithCategory(categories)
    },
  },
  mounted() {
    this.getProductsFromData()
  },
  computed: {
    ...mapGetters({
      getDollarRate: 'products/getDollarRate',
      dollarRate: 'products/getDollarRate',
      productsInTrash: 'products/getProductsInTrash',
      getCountOfProductsInTrash: 'products/getCountOfProductsInTrash',
    })
  }
})
</script>

<style lang="scss" scoped>
#container {
  margin: auto 4rem;
}
</style>
