import React, { useState } from 'react';
import styles from './Todo.module.scss';
import axios from 'axios';
import Search from './Search';
import MySelect from './MySelect';
import UlTodo from './UlTodo/UlTodo';
import { ref, push, update, remove, get } from 'firebase/database';
import { db } from '../firebase';
const Todo = ({ todo, setTodo, post, setPost }) => {
	const [edit, setEdit] = useState(null);
	const [value, setValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [selectedSort, setSelectedSort] = useState('');

	const handleChange = ({ target }) => {
		setPost(target.value);
	};
	const addNewPost = () => {
		const todosAddDbRef = ref(db, 'todos');
		push(todosAddDbRef, {
			title: post,
			checked: false,
		})
			.then((response) => {
				console.log('Данные успешно отправлены на сервер', response);
			})
			.catch((error) => {
				console.log('Не удалось отправить данные на сервер', error);
			});
		// const newPost = {
		// 	id: new Date().toLocaleTimeString(),
		// 	title: post,
		// 	checked: false
		// };
		// if (
		// 	todo.find(
		// 		(objj) =>
		// 			objj.title.toLowerCase().trim() ===
		// 			newPost.title.toLowerCase().trim(),
		// 	)
		// ) {
		// 	setTodo((prev) => [...prev]);
		// 	alert('Задача уже была создана');
		// } else if (post === '') {
		// 	setTodo((prev) => [...prev]);
		// 	alert('Задача НЕ может быть пустая');
		// } else {
		// 	axios
		// 		.post('http://localhost:3004/todos', newPost)
		// .then((response) => {
		// 	console.log('Данные успешно отправлены на сервер', response);
		// })
		// .catch((error) => {
		// 	console.log('Не удалось отправить данные на сервер', error);
		// });
		// setTodo((prev) => [...prev, newPost]);
		setPost('');
	};
	const editTodo = (id, title) => {
		setEdit(id);
		setValue(title);
	};
	const deletePost = (id) => {
		const todosAddDbRef = ref(db, `todos/${id}`);
		remove(todosAddDbRef)
			.then(() => {
				console.log('Данные успешно удалены');
			})
			.catch((error) => {
				console.log('Не удалось удалить данные', error);
			});
		// setTodo((prev) => prev.filter((filt) => filt.id !== id));
	};
	const saveTodo = (id) => {
		const newTodoDbRef = ref(db, `todos/${id}`);
		update(newTodoDbRef, {
			title: value,
		})
		setEdit(null);
	};
	const sortTodo = (sort) => {
		setSelectedSort(sort);
		// setTodo(Object.entries([...todo]).sort((a, b) => a[sort].localeCompare(b[sort])));
		// setTodo(Object.entries(todo).sort(([id1, obj1], [id2, obj2]) => obj1[sort].localeCompare(obj2[sort])));
		const sortedTodo = Object.entries(todo).sort(([id1, obj1], [id2, obj2]) => {
			const value1 = (obj1.sort || '');
			const value2 = (obj2.sort || '');

			return value1.localeCompare(value2);
		  });

		  setTodo(sortedTodo);

	};
	const onTodoChecked = (id) => {
		const todoCheckedDbRef = ref(db, `todos/${id}`);

		get(todoCheckedDbRef).then((snapshot) => {
			const currentChecked = snapshot.val().checked;
			update(todoCheckedDbRef, {
				checked: !currentChecked,
			})
				.then(() => {
					console.log(`Значение checked успешно обновлено.`);
				})
				.catch((error) => {
					console.log(`Не удалось обновить checked. Ошибка: ${error}`);
				});
		});
	};

	return (
		<div className={styles.todo_app}>
			<div className={styles.headerTodo}>
				<h1>To-Do List</h1>
				<img className={styles.headerTodoImg} src="images/todo.png" alt="todo" />
			</div>
			<div className={styles.row}>
				<input
					type="text"
					value={post}
					placeholder="Add your text"
					onChange={handleChange}
				/>
				<button onClick={addNewPost}>Add</button>
			</div>
			{Object.entries(todo).length ? (
				<div className={styles.todoContainer}>
					<div className={styles.searchBlok}>
						<MySelect
							value={selectedSort}
							onChange={sortTodo}
							defaultValue="Sorting"
							options={[
								{ value: 'title', name: 'by name' },
								{ value: 'id', name: 'by date' },
							]}
						/>
						<Search
							searchValue={searchValue}
							setSearchValue={setSearchValue}
						/>
					</div>
					<UlTodo
						todo={todo}
						searchValue={searchValue}
						edit={edit}
						setValue={setValue}
						value={value}
						saveTodo={saveTodo}
						onTodoChecked={onTodoChecked}
						editTodo={editTodo}
						deletePost={deletePost}
					/>
				</div>
			) : (
				<h2>Add a task</h2>
			)}
		</div>
	);
};

export default Todo;
