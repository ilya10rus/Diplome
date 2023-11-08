import styles from './page-error.module.css';

export const ErrorPage = () => {
	return (
		<div className={styles.error_message_container}>
			<h2>
				Что-то пошло не так! <i className={'fa fa-frown-o'} />
			</h2>
		</div>
	);
};
