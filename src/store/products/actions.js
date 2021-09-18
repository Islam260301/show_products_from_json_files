export function setProductsWithCategory ( context, products) {
  context.commit('SET_PRODUCTS_WITH_CATEGORIES', products)
}
export function setProductToTrash ( context, product) {
  context.commit('SET_PRODUCTS_TO_TRASH', product)
}

export function removeProductFromTrash ( context, ids) {
  context.commit('REMOVE_PRODUCT_FROM_TRASH', ids)
}

export function setCountOfProductInTrash ( context, payload) {
  context.commit('SET_COUNT_OF_PRODUCT_TO_TRASH', payload)
}

export function setDollarRate ( context, newRate ) {
  context.commit('SET_DOLLAR_RATE', newRate)
}

