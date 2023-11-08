import { setArticleNewsData } from './set-article-news-data';
import { request } from '../../utils/request';

export const loadArticleNewsAsync = (articleId) => (dispatch) =>
	request(`/newsarticles/${articleId}`).then((articleData) => {
		if (articleData.data) {
			dispatch(setArticleNewsData(articleData.data));
		}
		return articleData;
	});
