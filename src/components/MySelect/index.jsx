import React, { useState } from 'react';
import styles from './MySelect.module.scss';
import { useDispatch } from 'react-redux';
import ACTION_TYPE from '../../actions/actionType';

export const MySelect = ({ options, defaultValue }) => {
	const [selectedSort, setSelectedSort] = useState('');
	const dispatch = useDispatch();
	const sortTodo = (sort) => {
		setSelectedSort(sort);
		dispatch({ type: ACTION_TYPE.SORTED_TODO, payload: sort });
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
