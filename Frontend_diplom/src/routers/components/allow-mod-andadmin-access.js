import { useSelector } from 'react-redux';
import { ROLE } from '../../constans';
import { selectUserRole } from '../../selectors';
import { Navigate } from 'react-router';

export const AllowModAndAdminAccess = ({ children }) => {
	const userRole = useSelector(selectUserRole);

	if (userRole === ROLE.ADMIN || ROLE.MODERATOR) {
		return children;
	} else if (userRole === ROLE.GUEST || ROLE.READER) {
		return <Navigate to="/" />;
	}
};
