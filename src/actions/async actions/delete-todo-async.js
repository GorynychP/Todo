import axios from 'axios';
import ACTION_TYPE from '../actionType';

export const deleteTodosAsync = (id, navigate) => (dispatch) => {
	return axios
		.delete(`http://localhost:3004/todos/${id}`)
		.then((res) => {
			console.log('Данные успешно удалены');
			dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });
			navigate('/');
		})
		.catch((error) => {
			console.log('Не удалось удалить данные', error);
			navigate('/');
		});
};
