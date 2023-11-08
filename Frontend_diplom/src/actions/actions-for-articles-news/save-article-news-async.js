import { request } from '../../utils';
import { setArticleNewsData } from './set-article-news-data';

export const saveArticleNewsAsync = (id, newArticleData) => (dispatch) => {
	const saveRequest = id
		? request(`/newsarticles/${id}`, 'PATCH', newArticleData)
		: request('/newsarticles', 'POST', newArticleData);

	return saveRequest.then((updateArticle) => {
		dispatch(setArticleNewsData(updateArticle.data));

		return updateArticle.data;
	});
};
