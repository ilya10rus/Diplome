import { request } from '../../utils';

export const removeArticleNewsAsync = (articleId) => () =>
	request(`/newsarticles/${articleId}`, 'DELETE');
