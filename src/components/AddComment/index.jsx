import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { fetchComments } from '../../redux/slices/comments';

export const Index = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const userData = useSelector((state) => state.auth.data);

  const onSubmit = async () => {
    try {
      const fields = {
        text,
      };
      await axios.post(`/comments/${id}`, fields);

      alert('Comentariul a fost postat');
      setText('');

      dispatch(fetchComments(id)).catch((err) => {
        console.warn(err);
      });
    } catch (err) {
      console.warn(err);
      alert('Eroare la publicarea comentariului');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={userData ? userData.avatarUrl : ''} />
        <div className={styles.form}>
          <TextField
            onChange={(e) => setText(e.target.value)}
            value={text}
            label="Scrie comentariu"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Trimite
          </Button>
        </div>
      </div>
    </>
  );
};
