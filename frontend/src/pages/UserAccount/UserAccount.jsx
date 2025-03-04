import { Link, useNavigate, useParams } from 'react-router-dom';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import { FileInput } from '../../components/FileInput/FileInput.jsx';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { handleDeleteUser } from '../../utils/api.js';
import { useUserProvider } from '../../context/UserContext.jsx';
import { getUserSession, removeUserSession } from '../../utils/localStorage.js';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import DeleteUser from './DeleteUser.jsx';

const UserAccount = () => {
    const { userId, userEmail } = useUserProvider();

    return (
        <div className='h-screen w-screen bg-custom-gradient bg-cover flex items-center justify-center'>
            <UserNavbar showProfileIcon={true} />
            <div className={'flex flex-col items-center gap-4'}>
                <p>{userEmail}</p>
                <FileInput />
                <DeleteUser />

            </div>

        </div>

    );
};

export default UserAccount;
