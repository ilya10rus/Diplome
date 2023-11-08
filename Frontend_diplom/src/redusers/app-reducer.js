import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
};

export const appReduser = (state = initialAppState, { type }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};

		default:
			return state;
	}
};
