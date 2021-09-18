export function SET_PRODUCTS_WITH_CATEGORIES(state, products) {

  state.products = [...products.map(productCategory => {
    productCategory.productItems = [...productCategory.productItems.map(product => {
      let isInTrash = state.countOfProductsInTrash[product.productId]
      if(isInTrash) {
        product.countInTrash = isInTrash.count
      }
      return product
    })]
    return productCategory
  })]
}

export function SET_PRODUCTS_TO_TRASH(state, product) {
  state.products = [...state.products.map(productCategory => {
    if (productCategory.categoryId === product.categoryId) {
      productCategory.productItems = [...productCategory.productItems.map(p => {
        if (p.productId === product.productId) {
          p.isInTrash = true
          p.countInTrash = 1
        }
        return p
      })]
    }
      return productCategory
  })]
  state.productsInTrash = [...state.productsInTrash, product]
  state.moneySummaOfProductsInTrash = state.productsInTrash.reduce((accum, p) => {
    return accum + (p.price * p.countInTrash)
  }, 0)
  let productId = product.productId.toString()
  let productItemInTrash = {}
  productItemInTrash[productId] = {count: product.countInTrash}
  state.countOfProductsInTrash = {...state.countOfProductsInTrash, ...productItemInTrash}
}

export function REMOVE_PRODUCT_FROM_TRASH(state, {categoryId, productId}) {
  state.products = [...state.products.map(productsCategory => {
    if (productsCategory.categoryId === categoryId) {
      productsCategory.productItems = [...productsCategory.productItems.map(product => {
        if(product.productId === productId) {
          product.isInTrash = false
          product.countInTrash = 0
        }
        return product
      })]
    }
    return productsCategory
  })]
  state.productsInTrash = [...state.productsInTrash.filter(product => {
      return product.productId !== productId
  })]

  let copyOfCountInTrash = {...state.countOfProductsInTrash}
  delete copyOfCountInTrash[productId]
  state.countOfProductsInTrash = copyOfCountInTrash

  state.moneySummaOfProductsInTrash = state.productsInTrash.reduce((accum, p) => {
    return accum + (p.price * p.countInTrash)
  })
}

export function SET_COUNT_OF_PRODUCT_TO_TRASH(state, {count, categoryId, productId}) {
  state.productsInTrash = [...state.productsInTrash.map(product => {
    if (product.categoryId === categoryId && product.productId === productId) {
      product.countInTrash = count
    }
    return product
  })]
  state.products = [...state.products.map(productCategory => {
    if(productCategory.categoryId === categoryId) {
      productCategory.productItems = [...productCategory.productItems.map(product => {
        if(product.productId === productId) {
          product.countInTrash = count
        }
        return product
      })]
    }
    return productCategory
  })]
}

export function SET_DOLLAR_RATE(state, newRate) {
  state.dollar_rate < newRate ? state.isPricesUpped = true : state.isPricesUpped = false
  state.dollar_rate = newRate
}
