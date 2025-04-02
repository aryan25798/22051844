const PostCard = ({ post }) => {
    return (
      <div className="border rounded-lg p-4 shadow-md mb-4">
        <img src={`https://source.unsplash.com/random/400x200?tech`} alt="Post" className="w-full mb-2 rounded-md" />
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="text-gray-600">{post.body}</p>
        <p className="text-sm text-gray-500 mt-2">Comments: {post.commentCount}</p>
      </div>
    );
  };
  
  export default PostCard;
  