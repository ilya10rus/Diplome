import { ACTION_TYPE } from '../type';

export const setArticleRepairsData = (articleData) => ({
	type: ACTION_TYPE.SET_ARTICLE_DATA,
	payload: articleData,
});
