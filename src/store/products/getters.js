export function getProductsG ( state ) {
  return state.products
}

export function getProductsInTrash ( state ) {
  return state.productsInTrash
}

export function getDollarRate (state) {
  return state.dollar_rate
}

export function getIsPricesUpped (state) {
  return state.isPricesUpped
}

export function getCountOfProductsInTrash (state) {
  return state.countOfProductsInTrash
}

export function getCountValue (state) {
  return state.countValue
}

export function getCurrentEditingProductId (state) {
  return state.currentEditingProductId
}
