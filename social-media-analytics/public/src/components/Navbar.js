import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">Social Media Analytics</h1>
      <div>
        <Link to="/" className="mx-2">Top Users</Link>
        <Link to="/trending" className="mx-2">Trending Posts</Link>
        <Link to="/feed" className="mx-2">Feed</Link>
      </div>
    </nav>
  );
};

export default Navbar;
