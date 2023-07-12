import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Header, MySelect, Search } from './components';
import { NotFound, TodoFullContent, TodoList } from './pages';
import { AppContext } from './context';

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
					axios.patch(`http://localhost:3004/todos/${id}`, {
						checked: !item.checked,
					});
					return { ...item, checked: !item.checked };
				}
				return item;
			}),
		);
	};

	return (
		<AppContext.Provider
			value={{
				todo,
				setTodo,
				edit,
				setValue,
				saveTodo,
				value,
				editTodo,
				title,
				setTitle,
				deletePost,
				setEdit,
				onTodoChecked,
			}}
		>
			<div className="App">
				<div className="container">
					<div className="todo-app">
						<Header todo={todo} setTodo={setTodo} />
						{todo.length ? (
							<div className="searchBlok">
								<MySelect
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
						) : (
							<h2>Add a task</h2>
						)}
						<Routes>
							<Route
								path="/"
								element={
									<TodoList todo={todo} searchValue={searchValue} />
								}
							></Route>
							<Route path="/todo/:id" element={<TodoFullContent />}></Route>
							<Route path="*" element={<NotFound />}></Route>
						</Routes>
					</div>
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
