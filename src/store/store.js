import {
	combineReducers,
	applyMiddleware,
	compose,
	legacy_createStore as createStore,
} from 'redux';
import { todoReducer, editTodoReducer, optionsReducer } from './reducers';
import thunk from 'redux-thunk';
const reducer = combineReducers({
	todos: todoReducer,
	editTodo: editTodoReducer,
	options: optionsReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
