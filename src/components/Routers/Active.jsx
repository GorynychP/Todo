import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Active.module.scss';
// import axios from 'axios';

export const Active = ({
	todo,
	edit,
	setValue,
	saveTodo,
	value,
	editTodo,
	title,
	setTitle,
	deletePost,
	setEdit,
}) => {
	const navigate = useNavigate();
	const params = useParams();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				`http://localhost:3004/todos/${params.id}`,
	// 			);
	// 			console.log('Данные todo успешно получены', response.data);
	// 			setTitle(response.data.title);
	// 		} catch (error) {
	// 			console.log('Не удалось todo получить данные', error);
	// 			setTitle('Такого todo не существует');
	// 		}
	// 	};

	// 	fetchData();
	// }, [params.id, setTitle]);

	const task = todo.find((item) => item.id === params.id );
	useEffect(()=> {
		setTitle(task.title);
	}, [params.id, setTitle, task.title]);

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
					<p className={styles.title}>
						{task.title.length !== 0 ? task.title :<span>Do it ✍ ❱❱❱ 📝❱❱❱ ✅</span>}
						{/* {title.length === 0 ? <span>Your task 📝</span> : title} */}
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
