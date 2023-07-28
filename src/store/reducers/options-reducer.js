const optionsInitialState = {
	searchValue: '',
	title: '',
};
export const optionsReducer = (state = optionsInitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SET_SEARCH_VALUE':
			return { ...state, searchValue: payload };
		case 'SET_TITLE':
			return { ...state, title: payload };
		default:
			return state;
	}
};
