import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import Todo from './components/Todo';
function App() {
	const [todo, setTodo] = useState([]);
	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/todos')
			.then((res) => setTodo(res.data));
	}, []);
	return (
		<div className="App">
			<div className="container">
			<Todo todo={todo} />
			</div>
		</div>
	);
}

export default App;
