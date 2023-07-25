import { useSelector } from 'react-redux';
import { TodoItems } from '../../components';
import styles from './TodoList.module.scss';
export const TodoList = ({ todo }) => {
	const searchValue = useSelector((state) => state.searchValue);
	const todoFilter = (arr) => {
		const filteredTodos = arr.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase().trim()),
		);
		return filteredTodos;
	};
	return (
		<>
			<ul>
				{todoFilter(todo).map((item, index) => (
					<TodoItems
						key={item.id}
						id={item.id}
						checked={item.checked}
						title={item.title}
						index={index}
					/>
				))}
			</ul>
		</>
	);
};
