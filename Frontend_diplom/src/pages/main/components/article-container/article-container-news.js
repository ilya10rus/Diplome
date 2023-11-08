import styles from './article.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { options } from '../../../../constans';

export const ArticleContainerNews = ({
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={styles.container_article}>
			<Link to={`/newsarticles/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className={styles.article_info}>
					<div className={styles.title_article}>
						<span>{title}</span>
					</div>
					<div className={styles.article_date_and_count_comments}>
						<div>
							{new Date(publishedAt).toLocaleDateString('ru-GB', options)}
						</div>
						<div className={styles.icon_comments}>
							<i className={'fa fa-comment-o'} />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
ArticleContainerNews.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
