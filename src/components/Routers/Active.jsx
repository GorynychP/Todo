import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Active.module.scss';
import axios from 'axios';

export const Active = ({
	edit,
	setValue,
	saveTodo,
	value,
	editTodo,
	title,
	setTitle,
}) => {
	const navigate = useNavigate();
	const params = useParams();
	console.log(params.id);
	useEffect(() => {
		axios
			.get(`http://localhost:3004/todos/${params.id}`)
			.then((response) => {
				console.log('Данные todo успешно получены', response.data);
				setTitle(response.data.title);
			})
			.catch((error) => {
				console.log('Не удалось todo получить данные', error);
			});
	}, []);

	return (
		<div className={styles.active}>
			<div className={styles.header}>
				<button className={styles.btnBack} onClick={() => navigate('/')}> ⬅</button>
				<h1>Полный контент </h1>
			</div>
			{edit === params.id ? (
				<div className={styles.editContainer} key={params.id}>
					<textarea
						className={styles.editInput}
						value={value}
						onChange={({ target }) => setValue(target.value)}
						rows={3}
					/>
					<button className={styles.btnSave} onClick={() => saveTodo(params.id)}>Save</button>
				</div>
			) : (
				<>
					<img
						className={styles.edit}
						src="/images/edit.svg"
						alt="edit"
						onClick={() => editTodo(params.id, title)}
					/>
					<p className={styles.title}> {title}</p>
				</>
			)}
		</div>
	);
};
