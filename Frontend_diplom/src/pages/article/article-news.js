import { useParams } from 'react-router';
import styles from './article.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticleNewsAsync } from '../../actions/actions-for-articles-news/load-article-news-async';
import { selectArticleNews } from '../../selectors';
import { CurrentArticle } from './components/current-article/current-article';
import { TailSpin } from 'react-loader-spinner';

export const ArticleNews = () => {
	const params = useParams();
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const articleNews = useSelector(selectArticleNews);
	const repair = 'News';
	const [loading, setLoading] = useState(false);
	const { id, title, imageUrl, content, publishedAt, comments } = articleNews;

	useEffect(() => {
		setLoading(true);
		dispatch(loadArticleNewsAsync(params.id)).then((articleData) => {
			setError(articleData.error);
			setLoading(false);
		});
	}, [dispatch, params.id]);

	return error ? (
		<div className={styles.error}>{error}</div>
	) : loading ? (
		<div className={styles.container_loader}>
			<TailSpin
				height="80"
				width="80"
				color="#eb8c4d"
				ariaLabel="tail-spin-loading"
				radius="1"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	) : (
		<CurrentArticle
			id={id}
			title={title}
			imageUrl={imageUrl}
			content={content}
			publishedAt={publishedAt}
			comments={comments}
			addCommentAsync={repair}
		/>
	);
};
