import { useRoutes } from 'react-router';
import { routeConfig } from './routeConfig';

export const ForumRouters = () => {
	const element = useRoutes(routeConfig);
	return element;
};
