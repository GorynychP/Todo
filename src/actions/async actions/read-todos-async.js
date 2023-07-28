import axios from 'axios';
import ACTION_TYPE from '../actionType';

export const readTodosAsync = () => (dispatch) => {
	return axios
		.get('http://localhost:3004/todos')
		.then((res) => {
			console.log('Данные todo успешно получены', res.data);
			dispatch({ type: ACTION_TYPE.SET_TODOS, payload: res.data });
			console.log(res.data);
		})
		.catch((error) => {
			console.log('Не удалось получить  данные', error);
		});
};
