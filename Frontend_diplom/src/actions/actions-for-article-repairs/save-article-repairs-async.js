import { request } from '../../utils';
import { setArticleRepairsData } from './set-article-repairs-data';

export const saveArticleRepairsAsync = (id, newArticleData) => (dispatch) => {
	const saveRequest = id
		? request(`/articleaboutrepairs/${id}`, 'PATCH', newArticleData)
		: request('/articleaboutrepairs', 'POST', newArticleData);

	return saveRequest.then((updateArticle) => {
		dispatch(setArticleRepairsData(updateArticle.data));

		return updateArticle.data;
	});
};
