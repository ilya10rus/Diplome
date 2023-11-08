import { useState } from 'react';
import { ROLE, options } from '../../../constans';
import { request } from '../../../utils';
import styles from './selected-role.module.css';
import PropTypes from 'prop-types';

export const SelectedRole = ({
	id,
	login,
	registeredAt,
	userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleCange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() =>
			setInitialRoleId(newUserRoleId),
		);
	};

	const isSaveBottonDisabled = Number(selectedRoleId) === initialRoleId;
	return (
		<>
			<tr key={id}>
				<td>{login}</td>
				<td>{new Date(registeredAt).toLocaleDateString('ru-GB', options)}</td>
				<td>
					<select value={selectedRoleId} onChange={onRoleCange}>
						{roles
							.filter(({ id: roleId }) => roleId !== ROLE.GUEST)
							.map(({ id: roleId, name: roleName }) => (
								<option value={roleId} key={Math.random(100)}>
									{roleName}
								</option>
							))}
					</select>
				</td>
				<td className={styles.btns}>
					<button
						disabled={isSaveBottonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					>
						<i className={'fa fa-floppy-o'} />
					</button>
					<button onClick={() => onUserRemove(id)}>
						<i className={'fa fa-trash-o'} />
					</button>
				</td>
			</tr>
		</>
	);
};

SelectedRole.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	userRoleId: PropTypes.number.isRequired,
	roles: PropTypes.array.isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
