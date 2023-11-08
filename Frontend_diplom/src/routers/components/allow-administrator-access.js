import { useSelector } from 'react-redux';
import { ROLE } from '../../constans';
import { selectUserRole } from '../../selectors';
import { Navigate } from 'react-router';

export const AllowAdministratorAccess = ({ children }) => {
	const userRole = useSelector(selectUserRole);
	if (userRole === ROLE.ADMIN) {
		return children;
	} else {
		return <Navigate to="/" />;
	}
};
