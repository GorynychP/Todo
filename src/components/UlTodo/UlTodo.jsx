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
	return (
			<ul>
				{todo
					.filter((item) =>
						item.title
							.toLowerCase()
							.includes(searchValue.toLowerCase().trim()),
					)
					.map((item, index) =>
						edit === item.id ? (
							<div className={styles.editContainer} key={item.id}>
								<input
									className={styles.editInput}
									value={value}
									onChange={({ target }) => setValue(target.value)}
								/>
								<button onClick={() => saveTodo(item.id)}>Save</button>
							</div>
						) : (
							<li
								key={item.id}
								id={item.id}
								className={item.checked ? styles.check : ''}
							>
								{item.checked ? (
									<img
										className={styles.checkbox}
										src="./images/checked.png"
										alt="checked"
										onClick={() => onTodoChecked(item.id)}
									/>
								) : (
									<img
										className={styles.checkbox}
										src="./images/unchecked.png"
										alt="unchecked"
										onClick={() => onTodoChecked(item.id)}
									/>
								)}
								<span>{index + 1}</span>. {item.title}
								<img
									className={styles.edit}
									src="/images/edit.svg"
									alt="edit"
									onClick={() => editTodo(item.id, item.title)}
								/>
								<img
									className={styles.deletePost}
									src="/images/delete.svg"
									alt="edit"
									onClick={() => deletePost(item.id)}
								/>
							</li>
						),
					)}
			</ul>
	);
};

export default UlTodo;
