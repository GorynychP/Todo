import React from 'react';
import styles from './Search.module.scss';

export const Search = ({ searchValue, setSearchValue }) => {
	return (
		<div className={styles.searchBlok}>
			<img width={16} height={16} src="/images/search.svg" alt="search" />
			<input
				type="text"
				className={styles.searchField}
				value={searchValue}
				placeholder="Search..."
				onChange={({ target }) => setSearchValue(target.value)}
			/>
			{searchValue && (
				<img
					className={styles.clearField}
					width={18}
					height={18}
					src="/images/delete.svg"
					alt=""
					onClick={() => setSearchValue('')}
				/>
			)}
		</div>
	);
};
