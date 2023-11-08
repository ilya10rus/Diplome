import { setArticleRepairsData } from './set-article-repairs-data';
import { request } from '../../utils/request';

export const loadArticleRepairsAsync = (articleId) => (dispatch) =>
	request(`/articleaboutrepairs/${articleId}`).then((articleData) => {
		if (articleData.data) {
			dispatch(setArticleRepairsData(articleData.data));
		}
		return articleData;
	});
