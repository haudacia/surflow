import React, { useState, useEffect, useRef } from 'react';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { handleUpdateProfilePicture, handleUpload, fetchUserData } from '../../utils/api';
import { useQuery } from 'react-query';
import { useUserProvider } from '../../context/UserContext';
import SmallButton from '../../components/Buttons/SmallButton';

export const FileInput = () => {
    const [url_Image, setUrlImage] = useState();
    const { userId } = useUserProvider();
    const { data: user, isLoading, isError, refetch } = useQuery(
        ['user', userId],
        () => fetchUserData(userId),
        { retry: false }
    );

    useEffect(() => {
        if (user?.profilePicture) {
            setUrlImage(user.profilePicture);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Sorry, there is an error.</div>
    }

    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = async (event) => {
        try {
            const url = await handleUpload(event);
            setUrlImage(url);
            await handleUpdateProfilePicture(userId, url);
            refetch();
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 w-36 h-52 max-w-52 ">
            <ProfilePicture imageUrl={url_Image} isIcon={false} />
            <div className="relative">
                <button
                    onClick={handleClick}
                    className='text-sm min-w-fit w-fit px-4 py-1 h-fit shadow-sm bg-azure hover:shadow-none transition-all duration-300 hover:bg-white p-3  whitespace-nowrap'
                >
                    Change picture
                </button>
                <input
                    id="file-input"
                    type="file"
                    className=" bg-black w-full h-full opacity-70 z-10"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};

export default FileInput;
