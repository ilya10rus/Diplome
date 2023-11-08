import styles from './search.module.css';
import PropTypes from 'prop-types';

export const Search = ({ searchPhrase, onChange }) => {
	return (
		<div className={styles.search_container}>
			<input
				value={searchPhrase}
				onChange={onChange}
				placeholder="Поиск по заголовкам..."
			/>
			<i className={'fa fa-search'} aria-hidden="true"></i>
		</div>
	);
};

Search.propTypes = {
	searchPhrase: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};
