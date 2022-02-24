import { configureStore } from "@reduxjs/toolkit";
import gemReducer from '../Features/gem'
import gemsReducer from '../Features/gems'
import adminReducer from '../Features/admin'
import userReducer from '../Features/user'
import itemForSaleReducer from '../Features/itemForSale'
import itemsForSaleReducer from '../Features/itemsForSale'
import ordersReducer from '../Features/orders'

export default configureStore({
  reducer: {
    gem: gemReducer,
    gems: gemsReducer,
    itemForSale: itemForSaleReducer,
    itemsForSale: itemsForSaleReducer,
    admin: adminReducer,
    user: userReducer,
    orders : ordersReducer,
  }
})