import { request } from '../../utils/request';
import { addCommentNews } from './add-comment-news';

export const addCommentNewsAsync = (articleId, content) => (dispatch) => {
	request(`/newsarticles/${articleId}/comments`, 'POST', { content }).then(
		(comment) => {
			dispatch(addCommentNews(comment.data));
		},
	);
};
