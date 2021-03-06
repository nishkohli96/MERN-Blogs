import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import { createPost } from '../graphql/queries';
import { client } from '../graphql/ApolloGQL';
import AlertMsg from '../components/AlertMsg';
import Header from '../components/Header';
import rootStore from '../store';

const CreatePost = () => {
	const user = rootStore.userStore.user;
	const [author] = useState(user);
	const [title, setTitle] = useState('');
	const [text, changeText] = useState('');
	const [alertmsg, setAlertMsg] = useState('');
	const [status, setStatus] = useState('');
	const [open, setOpen] = React.useState(false);
	const history = useHistory();

	const newPost = () => {
		if (title === '' || text === '') {
			setAlertMsg('Please fill all fields');
			setStatus('error');
			setOpen(true);
			return;
		}

		const form = {
			title: title,
			text: text,
			author: author,
		};

		client.mutate({ mutation: createPost(form) });
		setAlertMsg('Your Post has been Shared');
		setStatus('success');
		setOpen(true);
		setTimeout(() => history.goBack(), 3000);
	};

	return (
		<React.Fragment>
			<Header />
			<div style={styles.container}>
				<div style={styles.textDiv}>
					<TextField
						style={styles.textField}
						placeholder="Title of your Post"
						variant="outlined"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div style={styles.textDiv}>
					<TextField
						style={styles.textField}
						placeholder="Share your thoughts with the world..."
						variant="outlined"
						multiline
						rows={6}
						value={text}
						onChange={(e) => changeText(e.target.value)}
					/>
				</div>
				<div>
					<Button
						onClick={() => newPost()}
						style={styles.btn}
						size="large"
					>
						Post
					</Button>
				</div>
				<AlertMsg title={alertmsg} open={open} severity={status} />
			</div>
		</React.Fragment>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 50,
		alignItems: 'center',
		marginTop: '10vh',
	},
	textDiv: {
		marginBottom: 20,
	},
	textField: {
		width: 800,
	},
	btn: {
		backgroundColor: '#3f51b5',
		color: '#ffffff',
	},
};

export default observer(CreatePost);
