import { request } from '../../utils';
import { removeCommentNews } from './remove-comment-news';

export const removeCommentNewsAsync = (articleId, commentId) => (dispatch) => {
	request(`/newsarticles/${articleId}/comments/${commentId}`, 'DELETE').then(() =>
		dispatch(removeCommentNews(commentId)),
	);
};
