import { ACTION_TYPE } from '../type';

export const removeCommentRepairs = (commentId) => ({
	type: ACTION_TYPE.REMOVE_COMMENT,
	payload: commentId,
});
