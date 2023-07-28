import axios from 'axios';
import ACTION_TYPE from '../actionType';

export const setChecketTodosAsync = (id, todo) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.SET_TODO_CHECKED, payload: id });
	return [...todo].map((item) => {
		if (item.id === id) {
			axios.patch(`http://localhost:3004/todos/${id}`, {
				checked: !item.checked,
			});
		}
	});
};
