import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticleRepairsAsync } from '../../actions/actions-for-article-repairs/load-article-repairs-async';
import { selectArticleRepairs } from '../../selectors';
import styles from './article.module.css';
import { CurrentArticle } from './components/current-article/current-article';
import { TailSpin } from 'react-loader-spinner';

export const ArticleRepair = () => {
	const params = useParams();
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const repair = 'Repair';
	const [loading, setLoading] = useState(false);

	const articleRepairs = useSelector(selectArticleRepairs);
	const { id, title, imageUrl, content, publishedAt, comments } = articleRepairs;
	useEffect(() => {
		setLoading(true);
		dispatch(loadArticleRepairsAsync(params.id)).then((articleData) => {
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
