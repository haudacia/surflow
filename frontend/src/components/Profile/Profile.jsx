import React from 'react'
import { Link } from 'react-router-dom';
import { useUserProvider } from '../../context/UserContext';
import { removeUserSession } from '../../utils/localStorage';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useQuery } from 'react-query';
import { fetchUserData } from '../../utils/api';


const ProfileIcon = ({ accountSettingsId, profileIconId }) => {
  const { userId, clearUserContext } = useUserProvider();

  const { data: user } = useQuery(
    ['user', userId],
    () => fetchUserData(userId),
    { retry: false }
  );

  const handleLogout = () => {
    removeUserSession();
    clearUserContext();
    window.location.replace('/login')
  }

  return (
    <div className="flex items-center dropdown dropdown-end scale-100">
      <div tabIndex={0} role="button" className="h-10 outline-none hover:outline-offset-0 rounded-full hover:outline-c2 avatar">
        <ProfilePicture imageUrl={user?.profilePicture} isIcon={true} />
      </div>
      <ul tabIndex={0} className="mt-36 z-[1] border-[1px] border-black shadow menu menu-sm dropdown-content bg-c1  w-fit">
        <li>
          <Link to={`/user/${userId}/account`} id={accountSettingsId} className='hover:bg-c2'>
            Settings
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className='hover:bg-c2 w-full'>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileIcon;
