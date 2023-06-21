import React from 'react';
import styles from './UlTodo.module.scss';
const UlTodo = ({
	todo,
	searchValue,
	edit,
	setValue,
	value,
	saveTodo,
	onTodoChecked,
	editTodo,
	deletePost,
}) => {
	const searcFilterTodo = (todo) => {
		return todo.filter(([id, { title }]) =>
			title.toLowerCase().includes(searchValue.toLowerCase().trim()),
		);
	};
	return (
		<ul>
			{searcFilterTodo(Object.entries(todo)).map(
				([id, { title, checked }], index) =>
					edit === id ? (
						<div className={styles.editContainer} key={id}>
							<input
								className={styles.editInput}
								value={value}
								onChange={({ target }) => setValue(target.value)}
							/>
							<button onClick={() => saveTodo(id)}>Save</button>
						</div>
					) : (
						<li key={id} id={id} className={checked ? styles.check : ''}>
							{checked ? (
								<img
									className={styles.checkbox}
									src="./images/checked.png"
									alt="checked"
									onClick={() => onTodoChecked(id)}
								/>
							) : (
								<img
									className={styles.checkbox}
									src="./images/unchecked.png"
									alt="unchecked"
									onClick={() => onTodoChecked(id)}
								/>
							)}
							<span>{index + 1}</span>.{title}
							<img
								className={styles.edit}
								src="/images/edit.svg"
								alt="edit"
								onClick={() => editTodo(id, title)}
							/>
							<img
								className={styles.deletePost}
								src="/images/delete.svg"
								alt="edit"
								onClick={() => deletePost(id)}
							/>
						</li>
					),
			)}
		</ul>
	);
};

export default UlTodo;
