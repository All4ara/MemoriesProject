import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import { useDispatch,useSelector } from 'react-redux';

import FileBase64 from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts'



const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', file: [] });
    const post = useSelector((state) => currentId ?  state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handelSubmit = (e) => {
        e.preventDefault();
        
        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        
        
    }
    const clear = () => {

    }
    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handelSubmit}>
            <Typography variant="h6">Whats Your Craft</Typography>
            <TextField className={classes.textfield} name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value  })}/>
            <TextField className={classes.textfield} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value  })}/>
            <TextField className={classes.textfield} name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value  })}/>
            <TextField className={classes.textfield} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value  })}/>
            <div className={classes.fileInput}>
                <FileBase64 type="file" multiple={false} onDone={(base64) => setPostData({...postData, file: base64})} />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;