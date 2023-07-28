import ACTION_TYPE from '../../actions/actionType';

const todoInitialState = [];
export const todoReducer = (state = todoInitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ACTION_TYPE.SET_TODOS:
			return payload;
		case ACTION_TYPE.ADD_TODO:
			return [...state, payload];
		case ACTION_TYPE.REMOVE_TODO:
			return [...state].filter((filt) => filt.id !== payload);
		case ACTION_TYPE.SORTED_TODO:
			return [...state].sort((a, b) => a[payload].localeCompare(b[payload]));
		case ACTION_TYPE.SET_TODO_CHECKED:
			return [...state].map((todo) => {
				if (todo.id === payload) {
					return { ...todo, checked: !todo.checked };
				}
				return todo;
			});
		default:
			return state;
	}
};
