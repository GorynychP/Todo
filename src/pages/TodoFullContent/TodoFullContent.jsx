import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TodoFullContent.module.scss';
import axios from 'axios';
import { AppContext } from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import { editAction, titleAction, valueAction } from '../../actions';

export const TodoFullContent = () => {
	const dispatch = useDispatch();
	const todoValue = useSelector((state) => state.todoValue);
	const edit = useSelector((state) => state.edit);
	const title = useSelector((state) => state.title);
	const navigate = useNavigate();
	const params = useParams();
	const { saveTodo, editTodo, deletePost } = useContext(AppContext);
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
				onClick={() => deletePost(params.id)}
			/>
			{edit === params.id ? (
				<div className={styles.editContainer} key={params.id}>
					<textarea
						className={styles.editInput}
						value={todoValue}
						onChange={({ target }) => dispatch(valueAction(target.value))}
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
