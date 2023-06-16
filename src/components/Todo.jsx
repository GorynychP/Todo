import React from 'react';
import styles from './Todo.module.scss';
const Todo = ({ todo }) => {
	return (
		<div className={styles.todo_app}>
			<h1>To-Do List</h1>
			<ul>
				{todo.map((item) =>
					item.completed ? (
						<li key={item.id} id={item.id} className={styles.checkmark}>
							{item.title}
						</li>
					) : (
						<li key={item.id} id={item.id}>
							{item.title}
						</li>
					),
				)}
			</ul>
		</div>
	);
};

export default Todo;
