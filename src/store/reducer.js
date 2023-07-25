const initialState = { edit: null, todoValue: '', searchValue: '', title: '' };

const reducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_EDIT':
			return { ...state, edit: payload };
		case 'SET_TODO_VALUE':
			return { ...state, todoValue: payload };
		case 'SET_SEARCH_VALUE':
			return { ...state, searchValue: payload };
		case 'SET_TITLE':
			return { ...state, title: payload };
		default:
			return state;
	}
};
export default reducer;
