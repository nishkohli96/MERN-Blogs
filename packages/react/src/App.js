import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import rootStore from './store';
import PrivateRoute from './components/PrivateRoute';
import CoverScreen from './pages/CoverScreen';
import HomeScreen from './pages/HomeScreen';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import FullPost from './pages/FullPost';
import CreatePost from './pages/CreatePost';

function App() {
	const user = rootStore.userStore.user;

	/*  To keep the history clean, you should set replace prop.
		This will avoid extra redirects after the user click back. */
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<CoverScreen />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/home" element={<HomeScreen />} />
					{/* <PrivateRoute
						user={user}
						path="/home"
						component={<HomeScreen />}
					/>
					<PrivateRoute
						user={user}
						path="/:userName/:slug"
						component={<FullPost />}
					/>
					<PrivateRoute
						user={user}
						path="/newpost"
						component={<CreatePost />}
					/> */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default observer(App);
