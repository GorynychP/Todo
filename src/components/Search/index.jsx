import React from 'react';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from '../../actions/actionCreators';

export const Search = () => {
	const searchValue = useSelector(({ options }) => options.searchValue);
	const dispatch = useDispatch();
	return (
		<div className={styles.searchBlok}>
			<img width={16} height={16} src="/images/search.svg" alt="search" />
			<input
				type="text"
				className={styles.searchField}
				value={searchValue}
				placeholder="Search..."
				onChange={({ target }) => dispatch(searchAction(target.value))}
			/>
			{searchValue && (
				<img
					className={styles.clearField}
					width={18}
					height={18}
					src="/images/delete.svg"
					alt=""
					onClick={() => dispatch(searchAction(''))}
				/>
			)}
		</div>
	);
};
