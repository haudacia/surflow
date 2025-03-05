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

const UserNavbar = ({ isCreateMode = false, children, ...rest }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const confirmDelete = (id) => {
        handleDeleteForm(id);
        setIsModalOpen(false);
        window.location.replace("/workspace");
    };

    return (
        <div className='flex items-center px-28 border-solid border-black border-b-[1px] justify-between' {...rest}>
            {isCreateMode ? (
                <div className={'flex items-center w-full'}>
                    <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
                    <UsernamesWorkspace />
                    <h2 className='px-4'>/</h2>{children}
                    <div className='flex gap-2'>
                        <ShareButton formId={id} className='bg-transparent border-black border text-sm' />
                        <SmallButton className='text-sm' text='Results' onClick={() => { navigate(`/formAnswers?form=${id}`) }} />
                        <SmallButton className='text-sm' text='Delete' onClick={() => setIsModalOpen(true)}
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
            ) : (
                <div className={'flex items-center w-full'}>
                    <div className={'flex items-center'}>
                        <ProfileIcon accountSettingsId='accountSettings' profileIconId='profileIcon' />
                        <UsernamesWorkspace />
                    </div>
                    <div className="flex ml-auto justify-between">
                        {children}
                    </div>
                </div>

            )
            }
        </div>
    );
};

export default UserNavbar;