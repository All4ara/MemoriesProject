import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';

import useStyles from './styles';

const Paginate  = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch(page);

    useEffect(() => {
       if(page) dispatch(getPosts);

    }, [page])

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={4}
            page={1}
            variant='outlined'
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )}
        />
    );
};

export default Paginate;