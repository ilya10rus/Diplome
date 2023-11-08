import { Link } from 'react-router-dom';
import styles from './main.module.css';

export const Main = () => {
	return (
		<div className={styles.container_main_page}>
			<div className={styles.greeting_new_user}>
				<h1>
					Добро пожаловать на <span className={styles.span_welcome}>ВРУМ</span>
				</h1>
				<div className={styles.disctription_about_forum}>
					Здесь можно подчерпнуть опыт людей о ремонте некоторых автомобилей, а
					так же почитать новости автомобильного мира.
				</div>
				<div className={styles.container_images_main_page}>
					<Link to="/articleaboutrepairs">
						<img
							src={
								'https://img.freepik.com/free-photo/close-up-hammers-and-repair-word-written-with-nails_23-2148393094.jpg?w=740&t=st=1698696404~exp=1698697004~hmac=195d1551fa23594c3ad68f956201b22cc915bcb6702c48c3350efa2de226380e'
							}
							alt="fixted_car"
							className={styles.image_tools}
						/>
						<span>Вперед к статьям о ремонте...</span>
					</Link>
					<Link to="/newsarticles" className={styles.link_news}>
						<img
							src={
								'https://img.freepik.com/free-photo/daily-news-announcement-information-report-concept_53876-123888.jpg?w=740&t=st=1698613471~exp=1698614071~hmac=03dbf0a7d31d9e4f26e716de33abb33fb0f48a2a4175af1b546517672b6c0747'
							}
							alt="auto_news"
							className={styles.image_news}
						/>
						<span>Вперед к новостным статьям...</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
