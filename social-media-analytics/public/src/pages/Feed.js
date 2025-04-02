import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:4000/posts?type=latest");
      setPosts(response.data);
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Live Feed</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
