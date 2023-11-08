import styles from './articles_about_repairs.module.css';
import { Search } from '../search/search';
import { debounce } from '../../utils';
import { useEffect, useMemo, useState } from 'react';
import { PAGINATION_LIMIT } from '../../../../constans';
import { request } from '../../../../utils/request';
import { Pagination } from '../pagination/pagination';
import { ArticleContainerRepairs } from '../article-container/article-container-repairs';
import { TailSpin } from 'react-loader-spinner';

export const ArticlesAboutRepairs = () => {
	const [articles, setArticles] = useState([]);
	const [page, setPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [lastPage, setLastPage] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		request(
			`/articleaboutrepairs?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setArticles(posts);
			setLoading(false);
			setLastPage(lastPage);
		});
	}, [page, searchPhrase]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		if (target.value.includes('[')) {
			let filterSearchPhrase = target.value.replaceAll('[', '');
			setSearchPhrase(filterSearchPhrase);
		} else {
			setSearchPhrase(target.value);
		}
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={styles.articles_container_about_repairs}>
			<Search onChange={onSearch} />
			{loading ? (
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
			) : articles.length > 0 ? (
				<div className={styles.articles_list}>
					{articles.map(({ id, title, imageUrl, publishedAt, comments }) => (
						<ArticleContainerRepairs
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							publishedAt={publishedAt}
							commentsCount={comments.length}
						/>
					))}
				</div>
			) : (
				<div className={styles.not_found}> Статьи не найдены</div>
			)}
			{lastPage > 1 && articles.length > 0 && (
				<Pagination
					setPage={setPage}
					lastPage={lastPage}
					page={page}
					className={styles.pagination}
				/>
			)}
		</div>
	);
};
