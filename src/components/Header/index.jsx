import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { fetchPosts } from '../../redux/slices/posts';

export const Header = () => {
  const dispatch = new useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Sunteți sigur că doriți să ieșiți din cont?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>NARR BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Publică o postare</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Ieșire din cont
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Autorizare</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">înregistrare cont</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
