export function SET_PRODUCTS_WITH_CATEGORIES(state, payload) {
  state.products = payload.newProducts
  state.productsInTrash = payload.newProductsInTrash
}

export function SET_PRODUCTS_TO_TRASH(state, payload) {
  state.products = payload.newProducts
  if(payload.productForSetToTrash) {
    state.productsInTrash = [payload.productForSetToTrash, ...state.productsInTrash]
  }
  state.countOfProductsInTrash = {...state.countOfProductsInTrash, ...payload.countOfProductInTrash}
}

export function REMOVE_PRODUCT_FROM_TRASH(state, payload) {
  state.products = payload.newProducts
  state.countOfProductsInTrash = payload.newObjOfProductCountInTrash
  state.productsInTrash = payload.newProductsInTrash
}

export function SET_COUNT_OF_PRODUCT_TO_TRASH(state, payload) {
  state.productsInTrash = payload.newProductsInTrash
  state.countOfProductsInTrash = {...state.countOfProductsInTrash, ...payload.newCountOfProductsInTrash}
  state.products = payload.newProducts
}

export function SET_DOLLAR_RATE(state, payload) {
  state.isPricesUpped = payload.mewIsPricesUpped
  state.dollar_rate = payload.newRate
}

export function SET_COUNT_VALUE(state, value) {
  state.countValue = value
}

export function SET_CURRENT_EDITING_PRODUCT_ID(state, id) {
  state.currentEditingProductId = id
}
