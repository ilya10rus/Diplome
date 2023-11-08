import styles from './footer.module.css';
export const Footer = () => {
	return (
		<div className={styles.footer_container}>
			<span>Форум создан автором:</span>
			<a href="https://github.com/ilya10rus" target="blank">
				Ilya
			</a>
		</div>
	);
};
