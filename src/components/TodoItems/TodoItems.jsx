import styles from './TodoItems.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { deleteTodosAsync, setChecketTodosAsync } from '../../actions/async actions';
import { useDispatch, useSelector } from 'react-redux';

export const TodoItems = ({ id, title, checked, index }) => {
	const todos = useSelector(({ todos }) => todos);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const MAX_LENGTH = 20;
	const truncateText = (text) => {
		if (text.length <= MAX_LENGTH) {
			return text;
		} else {
			return text.substring(0, MAX_LENGTH) + ' . . . ';
		}
	};

	return (
		<li key={id} id={id} className={checked ? styles.check : ''}>
			{checked ? (
				<img
					className={styles.checkbox}
					src="./images/checked.png"
					alt="checked"
					onClick={() => dispatch(setChecketTodosAsync(id, todos))}
				/>
			) : (
				<img
					className={styles.checkbox}
					src="./images/unchecked.png"
					alt="unchecked"
					onClick={() => dispatch(setChecketTodosAsync(id, todos))}
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
				onClick={() => dispatch(deleteTodosAsync(id, navigate))}
			/>
		</li>
	);
};
