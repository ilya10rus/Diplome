import { Toolbar } from './componets/toolbar/toolbar';
import { Footer } from './componets/footer/footer';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';
import { ForumRouters } from './routers';

export const ForumVroom = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currenrUserDataJSON = sessionStorage.getItem('userData');

		if (!currenrUserDataJSON) {
			return;
		}
		const currenrUserData = JSON.parse(currenrUserDataJSON);
		dispatch(
			setUser({
				...currenrUserData,
				roleId: Number(currenrUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<>
			<Toolbar />
			<ForumRouters />
			<Footer />
		</>
	);
};
