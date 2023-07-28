import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ACTION_TYPE from '../../actions/actionType';

export const Header = () => {
	const [post, setPost] = useState('');
	const todo = useSelector(({ todos }) => todos);
	const dispatch = useDispatch();
	const handleChange = ({ target }) => {
		setPost(target.value);
	};
	const addNewPost = () => {
		const currentDate = new Date().getTime();
		const id = `${currentDate}-${post}`;

		const newPost = {
			id: id,
			title: post,
			checked: false,
		};
		if (
			todo.find(
				(objj) =>
					objj.title.toLowerCase().trim() ===
					newPost.title.toLowerCase().trim(),
			)
		) {
			if (newPost.title.length === 0) {
				axios
					.post('http://localhost:3004/todos', newPost)
					.then((response) => {
						console.log('Данные успешно отправлены на сервер', response);
					})
					.catch((error) => {
						console.log('Не удалось отправить данные на сервер', error);
					});
				dispatch({ type: ACTION_TYPE.ADD_TODO, payload: newPost });
			} else {
				alert('Задача уже была создана');
			}
		} else {
			axios
				.post('http://localhost:3004/todos', newPost)
				.then((response) => {
					console.log('Данные успешно отправлены на сервер', response);
				})
				.catch((error) => {
					console.log('Не удалось отправить данные на сервер', error);
				});
			dispatch({ type: ACTION_TYPE.ADD_TODO, payload: newPost });
		}
		setPost('');
	};
	return (
		<>
			<div className={styles.headerTodo}>
				<Link to="/">
					<h1>To-Do List</h1>
				</Link>
				<Link to="/">
					<img
						className={styles.headerTodoImg}
						src="images/todo.png"
						alt="todo"
					/>
				</Link>
			</div>
			<div className={styles.row}>
				<input
					type="text"
					value={post}
					placeholder="Add your text"
					onChange={handleChange}
				/>
				<button onClick={addNewPost}>Add</button>
			</div>
		</>
	);
};
