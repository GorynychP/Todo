// import React, { useState } from 'react';
import styles from './Todo.module.scss';
import axios from 'axios';
const Todo = ({ todo, setTodo, post, setPost }) => {
	// const [isChecked, setIsChecked] = useState(false);

	// const handleClick = () => {
	// 	setIsChecked(!isChecked);
	// };
	const handleChange = ({ target }) => {
		setPost(target.value);
	};

	const addNewPost = () => {
		const newPost = {
			id: Math.floor(Math.random() * (100 - 1 + 1) + 1),
			title: post,
		};
		axios.post('http://localhost:3004/todos', newPost);
		setTodo((prev) => [...prev, newPost]);
		console.log(newPost);
	};

	const deletePost = (id) => {
		axios.delete(`http://localhost:3004/todos/${id}`);
		setTodo((prev) => prev.filter((filt) => filt.id !== id));
	};

	return (
		<div className={styles.todo_app}>
			<h1>To-Do List</h1>
			<div className={styles.row}>
				<input
					type="text"
					value={post}
					placeholder="Add your text"
					onChange={handleChange}
				/>
				<button onClick={addNewPost}>Add</button>
			</div>
			<ul>
				{todo.map((item) => (
					<li key={item.id} id={item.id}>
						{/* <img
							className='checkbox'
							src={isChecked ? '/images/checked.png' : '/images/unchecked.png'}
							onClick={handleClick}
							alt='checkbox'
						/> */}
						{item.id}. {item.title} <span onClick={() => deletePost(item.id)}>✕</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Todo;
