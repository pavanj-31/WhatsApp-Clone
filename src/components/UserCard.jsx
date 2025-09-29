import { Link, useParams } from "react-router-dom";

function UserCard(props) {
  const params = useParams();
  const { userObject } = props;
  const isActive = params?.chatId === userObject.id;
  return (
    <Link to={`/${userObject.id}`}
      className={`flex gap-4 items-center justify-center hover:bg-background p-2 rounded cursor-pointer  ${isActive && "bg-background"}`}>
      {/* Render user data here */}
      <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="" className="w-12 h-12 object-cover rounded-full" />
      {/* ... other user data */}
      <h2 className='flex-grow'>{userObject.userData.name}</h2>
    </Link>
  )
}

export default UserCard