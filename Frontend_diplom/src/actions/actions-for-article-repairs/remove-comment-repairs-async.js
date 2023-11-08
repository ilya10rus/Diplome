import { request } from '../../utils';
import { removeCommentRepairs } from './remove-comment-repairs';

export const removeCommentRepairsAsync = (articleId, commentId) => (dispatch) => {
	request(`/articleaboutrepairs/${articleId}/comments/${commentId}`, 'DELETE').then(
		() => dispatch(removeCommentRepairs(commentId)),
	);
};
