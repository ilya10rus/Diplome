import { ACTION_TYPE } from '../type';

export const removeCommentNews = (commentId) => ({
	type: ACTION_TYPE.REMOVE_COMMENT,
	payload: commentId,
});
