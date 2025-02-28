import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserProvider } from '../../context/UserContext';
import { removeUserSession } from '../../utils/localStorage';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useQuery } from 'react-query';
import { fetchUserData } from '../../utils/api';


const ProfileIcon = ({ accountSettingsId, profileIconId }) => {
  const navigate = useNavigate();
  const { userId, clearUserContext } = useUserProvider();

  const { data: user } = useQuery(
    ['user', userId],
    () => fetchUserData(userId),
    { retry: false }
  );

  const handleLogout = () => {
    removeUserSession();
    clearUserContext();
    navigate('/login')
  }

  return (
    <div className="flex items-center dropdown dropdown-end scale-100">
      <div tabIndex={0} role="button" className="btn-circle outline-none hover:outline-offset-0 hover:outline-azure avatar">
        <ProfilePicture imageUrl={user?.profilePicture} />
      </div>
      <ul tabIndex={0} className="mt-36 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white/50 rounded-box w-52">
        <li>
          <Link to={`/user/${userId}/account`} id={accountSettingsId} className='hover:bg-white'>
            Settings
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className='hover:bg-white'>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileIcon;
