export function setProductsWithCategory({commit, state}, products) {
  const newProducts = [...products.map(productCategory => {
    productCategory.productItems = [...productCategory.productItems.map(product => {
      let isInTrash = state.countOfProductsInTrash[product.productId]
      if (isInTrash) {
        product.countInTrash = isInTrash.count
      }
      return product
    })]
    return productCategory
  })]

  const newProductsInTrash = [...state.productsInTrash.map(product => {
    let newProduct = {...product}
    newProduct.price = Math.round((product.initialPrice * state.dollar_rate * 100) / 100) * newProduct.countInTrash
    return newProduct
  })]

  const payload = {
    newProductsInTrash,
    newProducts
  }
  commit('SET_PRODUCTS_WITH_CATEGORIES', payload)
}

export function setProductToTrash({commit, state}, product) {
  let productForSetToTrash = {}
  const newProducts = state.products.map(productCategory => {
    if (productCategory.categoryId === product.categoryId) {
      productCategory = {
        ...productCategory, productItems: productCategory.productItems.map(p => {
          const newP = {...p}
          if (newP.productId === product.productId) {
            newP.isInTrash = true
            newP.countInTrash = 1
            productForSetToTrash = state.productsInTrash.find(prodInTrash => {
              return prodInTrash.productId === product.productId
            }) ? null : newP
          }
          return newP
        })
      }
    }
    return productCategory
  })

  let productId = product.productId.toString()
  let countOfProductInTrash = {}
  countOfProductInTrash[productId] = {count: 1}

  const payload = {
    newProducts,
    productForSetToTrash,
    countOfProductInTrash
  }
  commit('SET_PRODUCTS_TO_TRASH', payload)
}

export function removeProductFromTrash({commit, state}, {categoryId, productId}) {
  const newProducts = [...state.products.map(productsCategory => {
    if (productsCategory.categoryId === categoryId) {
      productsCategory = {
        ...productsCategory, productItems: productsCategory.productItems.map(product => {
          let newProduct = {...product}
          if (newProduct.productId === productId) {
            newProduct.isInTrash = false
            newProduct.countInTrash = 0
          }
          return newProduct
        })
      }
    }
    return productsCategory
  })]
  const newProductsInTrash = [...state.productsInTrash.filter(product => {
    return product.productId !== productId
  })]

  let newObjOfProductCountInTrash = {...state.countOfProductsInTrash}
  delete newObjOfProductCountInTrash[productId]

  const payload = {
    newProducts,
    newObjOfProductCountInTrash,
    newProductsInTrash
  }
  commit('REMOVE_PRODUCT_FROM_TRASH', payload)
}

export function setCountOfProductInTrash({commit, state}, {count, product}) {
  let {productId, categoryId} = product
  let newProductsInTrash
  if (state.productsInTrash.some(p => {
    return p.categoryId === categoryId && p.productId === product.productId
  })) {
    newProductsInTrash = [...state.productsInTrash.map(productItem => {
      const newProduct = {...productItem}
      if (newProduct.categoryId === categoryId && newProduct.productId === productId) {
        newProduct.price = Math.round((newProduct.initialPrice * state.dollar_rate * 100) / 100) * count
        newProduct.countInTrash = count
      }
      return newProduct
    })]
  } else {
    const newProduct = {
      ...product,
      isInTrash: true,
      countInTrash: count,
      price: Math.round((product.initialPrice * state.dollar_rate * 100) / 100) * count
    }
    newProductsInTrash = [newProduct, ...state.productsInTrash]
  }
  const newProducts = [...state.products.map(productCategory => {
    if (productCategory.categoryId === categoryId) {
      productCategory = {
        ...productCategory, productItems: productCategory.productItems.map(product => {
          const newProduct = {...product}
          if (product.productId === productId) {
            newProduct.countInTrash = count
            newProduct.isInTrash = true
          }
          return newProduct
        })
      }
    }
    return productCategory
  })]

  const copyOfCountOfProductsInTrash = {...state.newCountOfProductsInTrash}
  copyOfCountOfProductsInTrash[productId] = {count}
  const newCountOfProductsInTrash = copyOfCountOfProductsInTrash

  const payload = {
    newProductsInTrash,
    newProducts,
    newCountOfProductsInTrash
  }
  commit('SET_COUNT_OF_PRODUCT_TO_TRASH', payload)
}

export function setDollarRate({commit, state}, newRate) {
  const mewIsPricesUpped = state.dollar_rate < newRate
  const payload = {
    newRate,
    mewIsPricesUpped
  }
  commit('SET_DOLLAR_RATE', payload)
}

export function setCountValue({commit}, value) {
  commit("SET_COUNT_VALUE", value)
}

export function setCurrentEditingProductId({commit}, id) {
  commit("SET_CURRENT_EDITING_PRODUCT_ID", id)
}

