import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './universal-article-container.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { checkAccess } from '../../utils';
import { ROLE } from '../../constans';
import { saveArticleRepairsAsync } from '../../actions/actions-for-article-repairs/save-article-repairs-async';
import { sanitizeContent } from './utils';
import { selectUserRole, selectArticleRepairs } from '../../selectors';
import { removeArticleRepairsAsync } from '../../actions/actions-for-article-repairs/remove-article-repairs-async';
import { removeArticleNewsAsync } from '../../actions/actions-for-articles-news/remove-article-news-async';
import { loadArticleRepairsAsync } from '../../actions/actions-for-article-repairs/load-article-repairs-async';
import { loadArticleNewsAsync } from '../../actions/actions-for-articles-news/load-article-news-async';
import { saveArticleNewsAsync } from '../../actions/actions-for-articles-news/save-article-news-async';
import PropTypes from 'prop-types';

export const UniversalArticleContainer = ({ flag }) => {
	const articleRepairs = useSelector(selectArticleRepairs);
	const { title, imageUrl, content } = articleRepairs;
	const params = useParams();
	const roleId = useSelector(selectUserRole);
	const isAdminAndMod = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], roleId);
	const id = params.id;

	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titlelValue, setTitleValue] = useState(title);
	const [contentValue, setContentValue] = useState(content);
	const [errorMessage, setErrorMessage] = useState(null);

	let heading = '';

	switch (flag) {
		case 'EditingRepair':
			heading = 'Внесите изменения в текущую статью';
			break;
		case 'EditingNews':
			heading = 'Внесите изменения в текущую статью';
			break;
		case 'Repair':
			heading = 'Создание новой статьи о ремонте';
			break;
		case 'News':
			heading = 'Создайте новостную статью';
			break;
		default:
			break;
	}

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		switch (flag) {
			case 'Repair':
				dispatch(
					saveArticleRepairsAsync(id, {
						imageUrl: imageUrlValue,
						title: titlelValue,
						content: newContent,
					}),
				).then(({ id }) => navigate(`/articleaboutrepairs/${id}`));
				break;
			case 'EditingRepair':
				dispatch(
					saveArticleRepairsAsync(id, {
						imageUrl: imageUrlValue,
						title: titlelValue,
						content: newContent,
					}),
				).then(({ id }) => navigate(`/articleaboutrepairs/${id}`));
				break;
			case 'News':
				dispatch(
					saveArticleNewsAsync(id, {
						imageUrl: imageUrlValue,
						title: titlelValue,
						content: newContent,
					}),
				).then(({ id }) => navigate(`/newsarticles/${id}`));
				break;
			case 'EditingNews':
				dispatch(
					saveArticleNewsAsync(id, {
						imageUrl: imageUrlValue,
						title: titlelValue,
						content: newContent,
					}),
				).then(({ id }) => navigate(`/newsarticles/${id}`));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (flag === 'EditingRepair') {
			dispatch(loadArticleRepairsAsync(params.id)).then((articleData) => {
				setErrorMessage(articleData.error);
			});
		}
		if (flag === 'EditingNews') {
			dispatch(loadArticleNewsAsync(params.id)).then((articleData) => {
				setErrorMessage(articleData.error);
			});
		}
	}, [flag, params.id, dispatch]);

	const onArticleRemove = (id) => {
		switch (flag) {
			case 'EditingRepair':
				dispatch(removeArticleRepairsAsync(id)).then(() => navigate('/'));
				break;
			case 'EditingNews':
				dispatch(removeArticleNewsAsync(id)).then(() => navigate('/'));
				break;
			default:
				break;
		}
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);
	const onContentChange = ({ target }) => setContentValue(target.value);

	useLayoutEffect(() => {
		setTitleValue(title);
		setImageUrlValue(imageUrl);
		setContentValue(content);
	}, [imageUrl, title, content]);

	return errorMessage ? (
		<div>{errorMessage}</div>
	) : (
		<div className={styles.container_universal_article}>
			<div className={styles.universal_article}>
				<h1>{heading}</h1>
				{isAdminAndMod && (
					<div className={styles.btn_trash_and_save}>
						<i onClick={() => onSave()} className={'fa fa-floppy-o'} />
						<i
							className={'fa fa-trash-o'}
							onClick={() => onArticleRemove(id)}
						/>
					</div>
				)}
				<form className={styles.form_universal_article}>
					<input
						value={imageUrlValue}
						type="text"
						placeholder="Загрузите url статьи..."
						onChange={onImageChange}
					/>
					<input
						value={titlelValue}
						type="text"
						placeholder="Напишите название статьи..."
						onChange={onTitleChange}
						className={styles.title_universal_article}
					/>
					<textarea
						value={contentValue}
						onChange={onContentChange}
						ref={contentRef}
						placeholder="Контент статьи..."
					/>
				</form>
			</div>
		</div>
	);
};
UniversalArticleContainer.propTypes = {
	flag: PropTypes.string.isRequired,
};
