import React from 'react';
import styles from './MySelect.module.scss';
const MySelect = ({ options, value, defaultValue, onChange }) => {
	return (
		<select  className={styles.selectedSearch} value={value} onChange={({ target }) => onChange(target.value)}>
			<option  disabled value="">
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

export default MySelect;
