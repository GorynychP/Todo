const editTodoInitialState = { id: null, todoValue: '' };

export const editTodoReducer = (state = editTodoInitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_EDIT':
			return { ...state, id: payload };
		case 'SET_TODO_VALUE':
			return { ...state, todoValue: payload };
		default:
			return state;
	}
};
