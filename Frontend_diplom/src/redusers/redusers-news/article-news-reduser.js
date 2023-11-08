import { ACTION_TYPE } from '../../actions';

const initialArticlesState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export const articleNewsReduser = (state = initialArticlesState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, payload],
			};
		case ACTION_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter((comment) => comment.id !== payload),
			};
		case ACTION_TYPE.SET_ARTICLE_DATA:
			return {
				...state,
				...payload,
			};
		case ACTION_TYPE.RESET_ARTICLE_DATA:
			return initialArticlesState;

		default:
			return state;
	}
};
