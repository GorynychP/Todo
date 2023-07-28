import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, MySelect, Search } from './components';
import { NotFound, TodoFullContent, TodoList } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { readTodosAsync } from './actions/async actions';

function App() {
	const todo = useSelector(({ todos }) => todos);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(readTodosAsync());
	}, []);

	return (
		<div className="App">
			<div className="container">
				<div className="todo-app">
					<Header />
					{todo.length ? (
						<div className="searchBlok">
							<MySelect
								defaultValue="Sorting"
								options={[
									{ value: 'title', name: 'by name' },
									{ value: 'id', name: 'by date' },
								]}
							/>
							<Search />
						</div>
					) : (
						<h2>Add a task</h2>
					)}
					<Routes>
						<Route path="/" element={<TodoList todo={todo} />}></Route>
						<Route path="/todo/:id" element={<TodoFullContent />}></Route>
						<Route path="*" element={<NotFound />}></Route>
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
