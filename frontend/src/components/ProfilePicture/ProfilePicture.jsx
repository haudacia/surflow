import React from 'react'
import { useUserProvider } from '../../context/UserContext'

export const ProfilePicture = ({ imageUrl, isIcon, ...rest }) => {
  const { userInitials } = useUserProvider()

  return (
    <div className="avatar-placeholder w-full h-full rounded-full bg-black text-neutral-content ">
      {imageUrl ? (
        <img
          id="profile_picture"
          alt="Profil picture"
          className="object-cover"
          src={imageUrl}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center" {...rest}>
          <span className="text-lg">{userInitials}</span>
        </div >
      )}
    </div >
  );
};

export default ProfilePicture