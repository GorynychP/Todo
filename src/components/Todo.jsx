import React, { useState } from 'react';
import styles from './Todo.module.scss';
import axios from 'axios';
import Search from './Search';
import MySelect from './MySelect';
import UlTodo from './UlTodo/UlTodo';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Active } from './Routers/Active';

const Todo = ({ todo, setTodo, post, setPost }) => {
	const [edit, setEdit] = useState(null);
	const [value, setValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [selectedSort, setSelectedSort] = useState('');
	const [title, setTitle] = useState('');

	const navigate = useNavigate();

	const handleChange = ({ target }) => {
		setPost(target.value);
	};
	const addNewPost = () => {
		const newPost = {
			id: new Date().toLocaleTimeString(),
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
			setTodo((prev) => [...prev]);
			alert('Задача уже была создана');
		} else if (post === '') {
			setTodo((prev) => [...prev]);
			alert('Задача НЕ может быть пустая');
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
	const editTodo = (id, title) => {
		setEdit(id);
		setValue(title);
	};
	const deletePost = (id) => {
		axios
			.delete(`http://localhost:3004/todos/${id}`)
			.then((response) => {
				console.log('Данные успешно удалены', response);
				navigate('/');
			})
			.catch((error) => {
				console.log('Не удалось удалить данные', error);
				navigate('/');
			});
		setTodo((prev) => prev.filter((filt) => filt.id !== id));
	};
	const saveTodo = (id) => {
		let newTodo = [...todo].map((item) => {
			if (item.id === id) {
				item.title = value;
				axios
					.patch(`http://localhost:3004/todos/${id}`, { title: value })
					.then((response) => {
						console.log('Данные успешно сохранены', response);
						setTitle(value)
					})
					.catch((error) => {
						console.log('Не удалось сохранить данные', error);
					});
			}
			return item;
		});
		setTodo(newTodo);
		setEdit(null);
	};
	const sortTodo = (sort) => {
		setSelectedSort(sort);
		setTodo([...todo].sort((a, b) => a[sort].localeCompare(b[sort])));
	};
	const onTodoChecked = (id) => {
		setTodo(
			[...todo].map((item) => {
				if (item.id === id) {
					if (item.checked === true) {
						axios.patch(`http://localhost:3004/todos/${id}`, {
							checked: false,
						});
						return { ...item, checked: false };
					} else {
						axios.patch(`http://localhost:3004/todos/${id}`, {
							checked: true,
						});
						return { ...item, checked: true };
					}
				}
				return item;
			}),
		);
	};
	const NotFount = () => {
		return (
			<div>
				<h1>Oops!</h1>
				<p>Такой страницы не существует</p>
			</div>
		);
	};
	return (
		<div className={styles.todo_app}>
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
					<Routes>
						<Route
							path="/"
							element={
								<UlTodo
									todo={todo}
									searchValue={searchValue}
									edit={edit}
									setValue={setValue}
									value={value}
									saveTodo={saveTodo}
									onTodoChecked={onTodoChecked}
									editTodo={editTodo}
									deletePost={deletePost}
								/>
							}
						></Route>
						<Route
							path="/todo/:id"
							element={
								<Active
									todo={todo}
									edit={edit}
									setValue={setValue}
									saveTodo={saveTodo}
									value={value}
									editTodo={editTodo}
									title={title}
									setTitle={setTitle}
									setEdit={setEdit}
									deletePost={deletePost}
								/>
							}
						></Route>
						<Route path="*" element={<NotFount />}></Route>
					</Routes>
				</div>
			) : (
				<h2>Add a task</h2>
			)}
		</div>
	);
};

export default Todo;
