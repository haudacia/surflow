import UserGreeting from './UserGreeting';
import UsernamesWorkspace from './UsernamesWorkspace';
import ProfileIcon from '../Profile/Profile';
import { useParams } from 'react-router-dom';
import ShareButton from '../DropDown/ShareButton';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useState } from 'react';
import SmallButton from '../Buttons/SmallButton';
import { handleDeleteForm } from '../../utils/api';

const UserNavbar = ({ isCreateMode, showProfileIcon = true, children }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const confirmDelete = (id) => {
        handleDeleteForm(id);
        setIsModalOpen(false);
        window.location.replace("/workspace");
    };

    return (
        <div className='flex items-center px-32 border-solid border-black border-b-[1px] justify-between'>
            {showProfileIcon && (
                <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
            )}
            <UsernamesWorkspace />
            {isCreateMode &&
                <div className={'flex items-center justify-evenly pl-5 w-full'}>
                    <h2 className='text-xl'>{`/`}</h2>{children}
                    <div className='flex gap-8'>
                        <ShareButton formId={id} className='bg-transparent border-black border shadow-vaporwave' />
                        <SmallButton className='border-black border shadow-vaporwave' text='Results' onClick={() => { navigate(`/formAnswers?form=${id}`) }} />
                        <SmallButton className='border-black border shadow-vaporwave' text='Delete' onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                    <ConfirmationModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title='Confirm Deletion'
                        description='Are you sure you want to delete the form?'
                        onConfirm={() => confirmDelete(id)}
                        textOnClose='Cancel'
                        textOnConfirm='Yes'
                    />

                </div>
            }
        </div>
    );
};

export default UserNavbar;