import { request } from '../../utils';

export const removeArticleRepairsAsync = (articleId) => () =>
	request(`/articleaboutrepairs/${articleId}`, 'DELETE');
