import { useEffect, useState } from 'react';
import styles from './users.module.css';
import { selectUserRole } from '../../selectors';
import { useSelector } from 'react-redux';
import { request, checkAccess } from '../../utils';
import { ROLE } from '../../constans';
import { SelectedRole } from './selected_role/selected-role';
import { TailSpin } from 'react-loader-spinner';

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		setLoading(true);
		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setLoading(false);
				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		request(`/users/${userId}`, 'DELETE').then(() =>
			setShouldUpdateUserList(!shouldUpdateUserList),
		);
	};

	return errorMessage ? (
		<div className={styles.error_message}>{errorMessage}</div>
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
		<div className={styles.users_container}>
			<h2>Пользователи</h2>
			<table>
				<tbody>
					<tr>
						<th>Имя пользователя</th>
						<th>Зарегестрирован</th>
						<th>Роль</th>
						<th>панель управления</th>
					</tr>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<SelectedRole
							key={id}
							id={id}
							login={login}
							userRoleId={roleId}
							registeredAt={registeredAt}
							onUserRemove={() => onUserRemove(id)}
							roles={roles}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
