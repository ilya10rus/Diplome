import styles from './current-article.module.css';
import { CommentsCurrentArticle } from './components/comments-current-article';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constans';
import { selectUserRole } from '../../../../selectors';
import PropTypes from 'prop-types';

export const CurrentArticle = ({
	id,
	title,
	imageUrl,
	content,
	comments,
	addCommentAsync,

}) => {
	const roleId = useSelector(selectUserRole);
	const isAdmin = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);

	let url = '';
	switch (addCommentAsync) {
		case 'Repair':
			url = 'articleaboutrepairs';
			break;
		case 'News':
			url = 'newsarticles';
			break;
		default:
			break;
	}
	return (
		<div className={styles.container_current_article}>
			<div className={styles.current_article}>
				{isAdmin ? (
					<div className={styles.link_edit}>
						<Link to={`/${url}/${id}/edit`}>
							<i className={'fa fa-pencil-square-o'} />
						</Link>
					</div>
				) : (
					<></>
				)}
				<div className={styles.text_current_article}>
					<img src={imageUrl} alt={title} />
					<h2>{title}</h2>
					{content}
				</div>
				<CommentsCurrentArticle
					comments={comments}
					articleId={id}
					addCommentAsync={addCommentAsync}
				/>
			</div>
		</div>
	);
};

CurrentArticle.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	addCommentAsyn: PropTypes.string,
};
