import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import MySelect from '../MySelect';
import Search from '../Search';
import axios from 'axios';

export const Header = ({ searchValue, setSearchValue, todo, setTodo }) => {
	const [post, setPost] = useState('');
	const [selectedSort, setSelectedSort] = useState('');

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
				setTodo((prev) => [...prev, newPost]);
			} else {
				setTodo((prev) => [...prev]);
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
			setTodo((prev) => [...prev, newPost]);
		}
		setPost('');
	};
	const sortTodo = (sort) => {
		setSelectedSort(sort);
		setTodo([...todo].sort((a, b) => a[sort].localeCompare(b[sort])));
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
			{todo.length ? (
				<div className={styles.todoContainer}>
					<div className={styles.searchBlok}>
						<MySelect
							value={selectedSort}
							onChange={sortTodo}
							defaultValue="Sorting"
							options={[
								{ value: 'title', name: 'by name' },
								{ value: 'id', name: 'by date' },
							]}
						/>
						<Search
							searchValue={searchValue}
							setSearchValue={setSearchValue}
						/>
					</div>
				</div>
			) : (
				<h2>Add a task</h2>
			)}
		</>
	);
};
