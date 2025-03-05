import { Link } from 'react-router-dom'
import { useUserProvider } from '../../context/UserContext';

function UsernamesWorkspace({ text, to }) {
    const { userName } = useUserProvider();
    const lastChar = userName[userName.length - 1]
    console.log(typeof (userName))
    return (
        <Link className='flex text-2xl pl-5 cursor-pointer min-w-fit' to={to ? to : '/workspace'}>
            {text ? text : userName}
            {(lastChar == 'z' || lastChar == 's')
                ?
                <p className='font-abril-fatface'>' workspace</p>
                :
                <p className='font-abril-fatface'>'s workspace</p>
            }
        </Link >
    )
}

export default UsernamesWorkspace