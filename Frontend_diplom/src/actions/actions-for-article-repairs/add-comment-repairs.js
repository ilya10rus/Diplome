import { ACTION_TYPE } from '../type';

export const addCommentRepairs = (comment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: comment,
});
