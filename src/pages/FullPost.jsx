import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { fetchComments } from '../redux/slices/comments';
import { fetchPost } from '../redux/slices/posts';

export const FullPost = () => {
  const { comments } = useSelector((state) => state.comments);
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isPostLoading = post.status === 'loading';
  const isCommentsLoading = comments.status === 'loading';
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(fetchComments(id)).catch((err) => {
      console.warn(err);
    });

    dispatch(fetchPost(id))
      .then()
      .catch((err) => {
        console.warn(err);
        alert('Eroare la primirea postării');
      });
  }, []);

  if (isPostLoading) {
    return <Post isLoading={true} isFullPost />;
  }

  return (
    <>
      <Post
        id={post.items.id}
        title={post.items.title}
        imageUrl={post.items.imageUrl ? `http://localhost:4444${post.items.imageUrl}` : ''}
        user={post.items.user}
        createdAt={post.items.createdAt}
        viewsCount={post.items.viewsCount}
        commentsCount={post.items.commentsCount}
        tags={post.items.tags}
        isFullPost>
        <ReactMarkdown children={post.items.text} />
      </Post>
      <CommentsBlock items={comments.items} isLoading={isCommentsLoading} />
      {isAuth ? <Index /> : ''}
    </>
  );
};
