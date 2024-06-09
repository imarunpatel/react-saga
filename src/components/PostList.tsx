// src/components/PostList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchPostsRequest, editPostRequest, deletePostRequest, Post } from '../store/post/postsSlice';

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const error = useSelector((state: RootState) => state.posts.error);

  console.log(loading, error);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  const handleEdit = (post: Post) => {
    const updatedPost = { ...post, title: 'Updated Title' };
    dispatch(editPostRequest(updatedPost));
  };

  const handleDelete = (postId: number) => {
    dispatch(deletePostRequest(postId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.length > 0 && posts?.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button onClick={() => handleEdit(post)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
