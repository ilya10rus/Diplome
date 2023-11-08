import { ACTION_TYPE } from '../type';

export const addCommentNews = (comment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: comment,
});
