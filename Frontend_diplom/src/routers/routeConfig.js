import {
	ArticleNews,
	ArticleRepair,
	ArticlesAboutRepairs,
	ArticlesNews,
	Autharization,
	ErrorPage,
	Main,
	Registration,
	UniversalArticleContainer,
	Users,
} from '../pages';
import { AllowAdministratorAccess } from './components/allow-administrator-access';
import { AllowModAndAdminAccess } from './components/allow-mod-andadmin-access';

export const routeConfig = [
	{
		path: '/',
		element: <Main />,
	},
	{
		path: '/articleaboutrepairs',
		element: <ArticlesAboutRepairs />,
	},
	{
		path: '/newsarticles',
		element: <ArticlesNews />,
	},
	{
		path: '/articleaboutrepairs/:id',
		element: <ArticleRepair />,
	},
	{
		path: '/newsarticles/:id',
		element: <ArticleNews />,
	},
	{
		path: '/autharizaton',
		element: <Autharization />,
	},
	{
		path: '/registration',
		element: <Registration />,
	},
	{
		path: '/users',
		element: (
			<AllowAdministratorAccess>
				<Users />
			</AllowAdministratorAccess>
		),
	},
	{
		path: '/newarticlerepair',
		element: (
			<AllowAdministratorAccess>
				<UniversalArticleContainer flag={'Repair'} />
			</AllowAdministratorAccess>
		),
	},
	{
		path: '/newarticlenews',
		element: (
			<AllowAdministratorAccess>
				<UniversalArticleContainer flag={'News'} />
			</AllowAdministratorAccess>
		),
	},
	{
		path: '/articleaboutrepairs/:id/edit',
		element: (
			<AllowModAndAdminAccess>
				<UniversalArticleContainer flag={'EditingRepair'} />
			</AllowModAndAdminAccess>
		),
	},
	{
		path: '/newsarticles/:id/edit',
		element: (
			<AllowModAndAdminAccess>
				<UniversalArticleContainer flag={'EditingNews'} />
			</AllowModAndAdminAccess>
		),
	},
	{
		path: '/articleaboutrepairs/edit',
		element: <ErrorPage />,
	},
	{
		path: '/newsarticles/edit',
		element: <ErrorPage />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
];
