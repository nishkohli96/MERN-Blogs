import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, path }) => {
	return (
		<Route
			path={path}
			element={user ? Component : <Navigate to="/" replace />}
		/>
	);
};

export default PrivateRoute;
