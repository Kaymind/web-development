import { combineReducers } from "redux";
import loginReducer from './login.reducer';
import registerReducer from './register.reducer';
import stockReducer from './stock.reducer';
import shopReducer from './shop.reducer';
import transactionReducer from './transaction.reducer';
export default combineReducers({
    loginReducer,
    registerReducer,
    stockReducer,
    shopReducer,
    transactionReducer,
})