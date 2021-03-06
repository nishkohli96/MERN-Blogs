import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { observer } from 'mobx-react';

import rootStore from '../store';
import { deletePost } from '../graphql/queries';
import { client } from '../graphql/ApolloGQL';
import AlertMsg from '../components/AlertMsg';
import Header from '../components/Header';

const FullPost = (Props) => {
	const classes = useStyles();
	const history = useHistory();
	const user = rootStore.userStore.user;
	const postObj = Props.location.state.record;

	const [avatarURL] = useState(postObj.author.avatarURL);
	const [open, setOpen] = React.useState(false);
	const [alertOpen, setAlertOpen] = React.useState(false);
	const isViewerAuthor = user.email === postObj.author.email;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const DeleteBtnOption = () => {
		return (
			<div style={styles.deletePost}>
				<Button className={classes.delBtn} onClick={handleClickOpen}>
					Delete Post
				</Button>
			</div>
		);
	};

	const deleteQuery = () => {
		client.mutate({ mutation: deletePost(postObj._id) });
		setOpen(false);
		setAlertOpen(true);
		setTimeout(() => history.goBack(), 3000);
	};

	return (
		<React.Fragment>
			<Header />
			<div style={styles.container}>
				<Card className={classes.root}>
					<CardContent>
						<div style={styles.titleDiv}>
							<div style={styles.titleText}>{postObj.title}</div>
							<div style={styles.authorRow}>
								<div style={styles.authorSubRow}>
									<Avatar
										alt="Author Image"
										src={avatarURL}
										className={classes.large}
									/>
									<div style={styles.authorName}>
										{postObj.author.name}
									</div>
								</div>
								<div
									style={{
										...styles.authorSubRow,
										justifyContent: 'flex-end',
									}}
								>
									{postObj.createdDate}
								</div>
							</div>
							<div style={styles.postText}>{postObj.text}</div>
						</div>
					</CardContent>
					{isViewerAuthor ? <DeleteBtnOption /> : <></>}
				</Card>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle>
						<div style={styles.deleteHeader}>Delete this Post?</div>
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							It can&apos;t be undone
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => deleteQuery()} color="primary">
							Yes
						</Button>
						<Button onClick={handleClose} color="primary" autoFocus>
							No
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<AlertMsg
				title="Your Post has been Deleted."
				open={alertOpen}
				severity={'success'}
			/>
		</React.Fragment>
	);
};

const useStyles = makeStyles({
	root: {
		width: 800,
		margin: 30,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	large: {
		width: 40,
		height: 40,
	},
	delBtn: {
		width: 300,
		backgroundColor: 'maroon',
		color: 'white',
		'&:hover': {
			backgroundColor: '#eb6734',
			boxShadow: 'none',
		},
	},
});

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '10vh',
	},
	titleDiv: {
		display: 'flex',
		flexDirection: 'column',
	},
	titleText: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'bolder',
		fontSize: 30,
	},
	authorRow: {
		display: 'flex',
		flex: 1,
		marginTop: 20,
	},
	authorSubRow: {
		display: 'flex',
		flex: 0.5,
		fontSize: 20,
		color: 'silver',
	},
	authorName: {
		margin: 'auto',
		marginLeft: 20,
	},
	postText: {
		marginTop: 20,
	},
	deletePost: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	deleteHeader: {
		color: '#eb6734',
	},
};
export default observer(FullPost);
