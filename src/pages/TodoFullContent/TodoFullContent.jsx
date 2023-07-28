import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TodoFullContent.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { editAction, titleAction, valueTodoAction } from '../../actions/actionCreators';
import { deleteTodosAsync } from '../../actions/async actions';
import ACTION_TYPE from '../../actions/actionType';

export const TodoFullContent = () => {
	const dispatch = useDispatch();
	const todoValue = useSelector(({ editTodo }) => editTodo.todoValue);
	const edit = useSelector(({ editTodo }) => editTodo.id);
	const title = useSelector(({ options }) => options.title);
	const todos = useSelector(({ todos }) => todos);
	const navigate = useNavigate();
	const params = useParams();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3004/todos/${params.id}`,
				);
				console.log('Данные todo успешно получены', response.data);
				dispatch(titleAction(response.data.title));
			} catch (error) {
				console.log('Не удалось todo получить данные', error);
				dispatch(titleAction('Такого todo не существует'));
			}
		};

		fetchData();
	}, [params.id]);

	const editTodo = (id, title) => {
		dispatch(editAction(id));
		dispatch(valueTodoAction(title));
	};

	const saveTodo = (id) => {
		let newTodo = [...todos].map((item) => {
			if (item.id === id) {
				item.title = todoValue;
				axios
					.patch(`http://localhost:3004/todos/${id}`, { title: todoValue })
					.then((response) => {
						console.log('Данные успешно сохранены', response.data);
						dispatch(titleAction(todoValue));
					})
					.catch((error) => {
						console.log('Не удалось сохранить данные', error);
					});
			}
			return item;
		});
		dispatch({ type: ACTION_TYPE.SET_TODOS, payload: newTodo });
		dispatch(editAction(null));
	};

	return (
		<div className={styles.active}>
			<div className={styles.header}>
				<button
					className={styles.btnBack}
					onClick={() => {
						navigate('/');
						dispatch(editAction(null));
					}}
				>
					{' '}
					⬅
				</button>
				<h1>Full content</h1>
			</div>
			<img
				className={styles.deletePost}
				src="/images/delete.svg"
				alt="delete"
				onClick={() => dispatch(deleteTodosAsync(params.id, navigate))}
			/>
			{edit === params.id ? (
				<div className={styles.editContainer} key={params.id}>
					<textarea
						className={styles.editInput}
						value={todoValue}
						onChange={({ target }) => dispatch(valueTodoAction(target.value))}
						rows={5}
					/>
					<div className={styles.btnContainer}>
						<button
							className={styles.btnSave}
							onClick={() => saveTodo(params.id)}
						>
							Save
						</button>
						<button
							className={styles.btnCancel}
							onClick={() => dispatch(editAction(null))}
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<>
					<p
						onClick={() => editTodo(params.id, title)}
						className={styles.title}
					>
						{title.length === 0 ? <span>Do it ✍ ❱❱❱ 📝❱❱❱ ✅</span> : title}
						<img
							className={styles.edit}
							src="/images/edit.svg"
							alt="edit"
							onClick={() => editTodo(params.id, title)}
						/>{' '}
					</p>
				</>
			)}
		</div>
	);
};
