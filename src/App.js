// import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import Todo from './components/Todo';
import {ref, onValue} from 'firebase/database'
import {db} from './firebase'
function App() {
	const [todo, setTodo] = useState({});
	const [post, setPost] = useState('');
	useEffect(() => {
		const todoListDbRef = ref(db, 'todos')

		return onValue(todoListDbRef, (todo)=> {
			const loadedTodo = todo.val() || {};
			setTodo(loadedTodo)
		})
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
