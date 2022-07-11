import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchPopularPosts, fetchTags } from '../redux/slices/posts';
import { fetchLastComments, returnToMain } from '../redux/slices/comments';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, popularposts, tags } = useSelector((state) => state.posts);
  const { lastComments } = useSelector((state) => state.comments);
  const [value, setValue] = React.useState(1);

  const isPostsLoading = posts.status === 'loading';
  const isPopularPostsLoading = popularposts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = lastComments.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchPopularPosts());
    dispatch(fetchTags());
    dispatch(returnToMain());
    dispatch(fetchLastComments());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} aria-label="basic tabs example">
        <Tab
          label="Toate postările"
          value={1}
          onClick={() => {
            setValue(1);
          }}
        />
        <Tab
          label="Postări populare"
          value={2}
          onClick={() => {
            setValue(2);
          }}
        />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {((Boolean(value === 1) ? isPostsLoading : isPopularPostsLoading)
            ? [...Array(5)]
            : Boolean(value === 1)
            ? posts.items
            : popularposts.items
          ).map((obj, index) =>
            (Boolean(value === 1) ? isPostsLoading : isPopularPostsLoading) ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={lastComments.items} isLoading={isCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
