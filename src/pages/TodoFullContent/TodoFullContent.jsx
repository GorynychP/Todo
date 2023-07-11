import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TodoFullContent.module.scss';
import axios from 'axios';
import { AppContext } from '../../context';

export const TodoFullContent = () => {
	const navigate = useNavigate();
	const params = useParams();
	const {
		edit,
		setValue,
		saveTodo,
		value,
		editTodo,
		title,
		setTitle,
		deletePost,
		setEdit,
	} = useContext(AppContext);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3004/todos/${params.id}`,
				);
				console.log('Данные todo успешно получены', response.data);
				setTitle(response.data.title);
			} catch (error) {
				console.log('Не удалось todo получить данные', error);
				setTitle('Такого todo не существует');
			}
		};

		fetchData();
	}, [params.id, setTitle]);

	return (
		<div className={styles.active}>
			<div className={styles.header}>
				<button
					className={styles.btnBack}
					onClick={() => {
						navigate('/');
						setEdit(null);
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
						value={value}
						onChange={({ target }) => setValue(target.value)}
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
							onClick={() => setEdit(null)}
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
