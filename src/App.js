import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import Todo from './components/Todo';
function App() {
	const [todo, setTodo] = useState([]);
	const [post, setPost] = useState('');
	useEffect(() => {
		axios.get('http://localhost:3004/todos').then((res) => setTodo(res.data))
		.then((response) => {
			console.log('Данные успешно получены', response);
		})
		.catch((error) => {
			console.log('Не удалось получить  данные', error);
		});
	}, []);

	return (
		<div className="App">
			<div className="container">
				<Todo todo={todo} post={post} setPost={setPost} setTodo={setTodo} />
			</div>
		</div>
	);
}

export default App;
