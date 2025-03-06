import { useUserProvider } from '../../context/UserContext';

const UserGreeting = () => {
    const { userName } = useUserProvider();
    const firstName = userName.split(" ")[0]

    return (
        <p className='lg:text-black text-transparent' >Hi, {firstName}!</p>
    )
};

export default UserGreeting;
