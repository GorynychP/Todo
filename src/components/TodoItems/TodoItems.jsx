import React, { useContext } from 'react';
import styles from './TodoItems.module.scss';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context';

export const TodoItems = ({ id, title, checked, index }) => {
	const MAX_LENGTH = 20;
	const truncateText = (text) => {
		if (text.length <= MAX_LENGTH) {
			return text;
		} else {
			return text.substring(0, MAX_LENGTH) + ' . . . ';
		}
	};

	const { onTodoChecked, deletePost } = useContext(AppContext);
	return (
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
			<Link to={`/todo/${id}`}>
				<span>{index + 1}</span>.{' '}
				{title.length === 0 ? (
					<span className={styles.void}> Add a task 🖊 ❗ ❗ ❗ ❱❱❱❱❱</span>
				) : (
					truncateText(title)
				)}
			</Link>
			<img
				className={styles.deletePost}
				src="/images/delete.svg"
				alt="delete"
				onClick={() => deletePost(id)}
			/>
		</li>
	);
};
