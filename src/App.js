import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Header } from './components';
import { Home, NotFound, TodoFullContent } from './pages';

function App() {
	const [todo, setTodo] = useState([]);
	const [edit, setEdit] = useState(null);
	const [value, setValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [title, setTitle] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:3004/todos')
			.then((res) => {
				console.log('Данные todo успешно получены', res.data);
				setTodo(res.data);
			})
			.catch((error) => {
				console.log('Не удалось получить  данные', error);
			});
	}, []);

	const navigate = useNavigate();

	const editTodo = (id, title) => {
		setEdit(id);
		setValue(title);
	};
	const deletePost = (id) => {
		axios
			.delete(`http://localhost:3004/todos/${id}`)
			.then((res) => {
				console.log('Данные успешно удалены');
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
						console.log('Данные успешно сохранены', response.data);
						setTitle(value);
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

	return (
		<div className="App">
			<div className="container">
				<div className="todo-app">
					<Header
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						todo={todo}
						setTodo={setTodo}
					/>
					<Routes>
						<Route
							path="/"
							element={
								<Home
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
								<TodoFullContent
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
						<Route path="*" element={<NotFound />}></Route>
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
