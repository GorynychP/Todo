import styles from './UlTodo.module.scss';
import { Link } from 'react-router-dom';

const UlTodo = ({
	todo,
	searchValue,
	onTodoChecked,
	deletePost,
}) => {
	const MAX_LENGTH = 25;
	const truncateText = (text) => {
		if (text.length <= MAX_LENGTH) {
			return text;
		} else {
			return text.substring(0, MAX_LENGTH) + ' . . . ';
		}
	};

	return (
		<>
			<ul>
				{todo
					.filter((item) =>
						item.title
							.toLowerCase()
							.includes(searchValue.toLowerCase().trim()),
					)
					.map((item, index) =>
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
								<Link to={`/todo/${item.id}`}>
									<span>{index + 1}</span>. {truncateText(item.title)}
								</Link>
								<img
									className={styles.deletePost}
									src="/images/delete.svg"
									alt="delete"
									onClick={() => deletePost(item.id)}
								/>
							</li>
					)}
			</ul>
		</>
	);
};

export default UlTodo;
