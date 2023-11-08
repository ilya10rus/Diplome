import styles from './pagination.module.css';
import PropTypes from 'prop-types';

export const Pagination = ({ setPage, lastPage, page }) => {
	return (
		<div className={styles.pagination_container}>
			<div className={styles.btn_next_page}>
				<i
					className={'fa  fa-angle-double-left'}
					onClick={() => (page === 1 ? null : setPage(1))}
				/>
			</div>

			<div className={styles.btn_next}>
				<i
					className={'fa  fa-angle-left'}
					onClick={() => (page === 1 ? null : setPage(page - 1))}
				/>
			</div>
			<div className={styles.current_page}> Страница: {page} </div>
			<div className={styles.btn_next}>
				<i
					className={'fa  fa-angle-right'}
					onClick={() => (page === lastPage ? null : setPage(page + 1))}
				/>
			</div>
			<div className={styles.btn_next_page}>
				<i
					className={'fa  fa-angle-double-right'}
					onClick={() => (page === lastPage ? null : setPage(lastPage))}
				/>
			</div>
		</div>
	);
};
Pagination.propTypes = {
	setPage: PropTypes.func.isRequired,
	lastPage: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
};
