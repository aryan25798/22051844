const UserCard = ({ user }) => {
    return (
      <div className="border rounded-lg p-4 shadow-lg">
        <img src={`https://source.unsplash.com/random/100x100?person`} alt="User" className="rounded-full mb-2" />
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-600">Posts: {user.posts}</p>
      </div>
    );
  };
  
  export default UserCard;
  