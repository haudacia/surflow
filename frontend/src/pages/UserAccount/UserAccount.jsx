import { FileInput } from '../../components/FileInput/FileInput.jsx';
import { useUserProvider } from '../../context/UserContext.jsx';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import DeleteUser from './DeleteUser.jsx';

const UserAccount = () => {
    const { userEmail } = useUserProvider();

    return (
        <div className={'grid grid-rows-[12%_88%] bg-c1 bg-cover h-screen '}>
            <UserNavbar showProfileIcon={true} />
            <div className={'flex flex-col items-center justify-center gap-6 mt-8'}>
                <p className='text-lg'>{userEmail}</p>
                {/* <SmallButton text='Change Username' className='w-[250px]' onClick={() => console.log('should allow user to change username')} /> */}
                <FileInput />
                <DeleteUser />
                <div>
                    {/* <ProfileIcon /> */}
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
