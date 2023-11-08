import styles from './comments-current-article.module.css';
import { Comment } from './comment/comment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../../selectors';
import { ROLE } from '../../../../../constans';
import { addCommentRepairsAsync } from '../../../../../actions/actions-for-article-repairs/add-comment-repairs-async';
import { addCommentNewsAsync } from '../../../../../actions/actions-for-articles-news/add-comment-news-async';
import PropTypes from 'prop-types';

export const CommentsCurrentArticle = ({ comments, articleId, addCommentAsync }) => {
	const dispatch = useDispatch();
	const [newComemnt, setNewComment] = useState('');
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (articleId, content) => {
		if (addCommentAsync === 'Repair') {
			dispatch(addCommentRepairsAsync(articleId, content));
			setNewComment('');
		}

		if (addCommentAsync === 'News') {
			dispatch(addCommentNewsAsync(articleId, content));
			setNewComment('');
		}
	};

	const isGuest = ROLE.GUEST === userRole;
	return (
		<div className={styles.container_comments}>
			{!isGuest && (
				<div className={styles.new_comment}>
					<textarea
						name="comment"
						value={newComemnt}
						placeholder="Ваш комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<div
						onClick={() => onNewCommentAdd(articleId, newComemnt)}
						className={styles.btn_add_comment}
					>
						<i className={`fa fa-paper-plane-o`} aria-hidden="true"></i>
					</div>
				</div>
			)}
			<div className={styles.comments_post}>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						articleId={articleId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
						addCommentAsync={addCommentAsync}
					/>
				))}
			</div>
		</div>
	);
};
CommentsCurrentArticle.propTypes = {
	comments: PropTypes.array.isRequired,
	articleId: PropTypes.string.isRequired,
	addCommentAsyn: PropTypes.string,
};
