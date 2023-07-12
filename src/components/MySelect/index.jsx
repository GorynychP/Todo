import React, { useContext, useState } from 'react';
import styles from './MySelect.module.scss';
import { AppContext } from '../../context';

export const MySelect = ({ options, defaultValue }) => {
	const [selectedSort, setSelectedSort] = useState('');
	const { todo, setTodo } = useContext(AppContext);

	const sortTodo = (sort) => {
		setSelectedSort(sort);
		setTodo([...todo].sort((a, b) => a[sort].localeCompare(b[sort])));
	};

	return (
		<select
			className={styles.selectedSearch}
			value={selectedSort}
			onChange={({ target }) => sortTodo(target.value)}
		>
			<option disabled value="">
				{defaultValue}
			</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};
