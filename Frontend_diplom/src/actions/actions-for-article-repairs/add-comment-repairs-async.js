import { request } from '../../utils';
import { addCommentRepairs } from './add-comment-repairs';

export const addCommentRepairsAsync = (articleId, content) => (dispatch) => {
	request(`/articleaboutrepairs/${articleId}/comments`, 'POST', { content }).then(
		(comment) => {
			dispatch(addCommentRepairs(comment.data));
		},
	);
};
