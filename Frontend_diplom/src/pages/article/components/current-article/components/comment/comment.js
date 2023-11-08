import styles from './comment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeCommentRepairsAsync } from '../../../../../../actions/actions-for-article-repairs/remove-comment-repairs-async';
import { removeCommentNewsAsync } from '../../../../../../actions/actions-for-articles-news/remove-comment-news-async';
import { selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constans';
import { options } from '../../../../../../constans';
import PropTypes from 'prop-types';

export const Comment = ({
	id,
	articleId,
	author,
	content,
	publishedAt,
	addCommentAsync,
}) => {
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	const onCommentRemove = (commentId) => {
		if (addCommentAsync === 'Repair') {
			dispatch(removeCommentRepairsAsync(articleId, commentId));
		}

		if (addCommentAsync === 'News') {
			dispatch(removeCommentNewsAsync(articleId, commentId));
		}
	};

	return (
		<div className={styles.container_comment}>
			<div className={styles.comment}>
				<div className={styles.information_panel}>
					<div className={styles.author}>
						<i className={'fa fa-user-circle-o'} />
						{author}
					</div>
					<div className={styles.published_at}>
						<i className={'fa fa-calendar-o'} />
						{new Date(publishedAt).toLocaleDateString('ru-GB', options)}
					</div>
				</div>
				<div className={styles.comment_text}>{content}</div>
			</div>
			{isAdminOrModerator && (
				<div className={styles.btn_delete_comment}>
					<i className={'fa fa-trash-o'} onClick={() => onCommentRemove(id)} />
				</div>
			)}
		</div>
	);
};
Comment.propTypes = {
	id: PropTypes.string.isRequired,
	articleId: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	addCommentAsync: PropTypes.string.isRequired,
};
