export const selectAdmin = (state) => state.admin

const voidGem = { status: 'void' }

export const selectGem = (gemId) => (state) => {
  return state.gem[ gemId ] ?? voidGem
}

export const selectGems = (state) => state.gems

export const selectItemForSale = (state) => state.itemForSale

export const selectItemsForSale = (state) => state.itemsForSale

export const selectUser = (state) => state.user

export const selectOrders = (state) => state.orders
