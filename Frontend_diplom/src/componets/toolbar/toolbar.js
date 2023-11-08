import { Link, useNavigate } from 'react-router-dom';
import styles from './toolbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin, selectUserRole } from '../../selectors';
import { logout } from '../../actions';
import { checkAccess } from '../../utils';
import { ROLE } from '../../constans';

export const Toolbar = () => {
	const navigate = useNavigate();

	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={styles.control_panel_container}>
			<Link to={'/'} className={styles.btn_home}>
				<i className={'fa fa-cogs'} aria-hidden="true" />
			</Link>
			{isAdmin ? (
				<nav>
					<ul>
						<li>
							<span>Создать</span>
							<ul>
								<li>
									<Link to={'/newarticlerepair'}>Статью о ремонте</Link>
								</li>
								<li>
									<Link to={'/newarticlenews'}>Новостную статью</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link to={'/users'}>Пользователи</Link>
						</li>
					</ul>
				</nav>
			) : (
				<div className={styles.admin_panel_is_not_active}>
					ВРУМ <span> Автомобильный форум </span>
				</div>
			)}

			<Link onClick={() => navigate(-1)} className={styles.btn_back}>
				<i className={'fa fa-arrow-left'} aria-hidden="true" />
			</Link>

			<>
				{roleId === ROLE.GUEST ? (
					<Link to="/autharizaton" className={styles.btn_authorization}>
						Войти
					</Link>
				) : (
					<>
						<div className={styles.user_name}>
							{login}
							<Link to={'/'} className={styles.logout} onClick={onLogout} >
								<i className={'fa fa-sign-out'} />
							</Link>
						</div>
					</>
				)}
			</>
		</div>
	);
};
