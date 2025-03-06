import { Link } from 'react-router-dom'
import { useUserProvider } from '../../context/UserContext';

function UsernamesWorkspace({ text, to }) {
    const { userName } = useUserProvider();
    const lastChar = userName[userName.length - 1]

    return (
        <Link className='flex text-lg pl-4 cursor-pointer min-w-fit' to={to ? to : '/workspace'}>
            {text ? text : userName}
            {(lastChar == 'z' || lastChar == 's')
                ?
                <p>' workspace</p>
                :
                <p>'s workspace</p>
            }
        </Link >
    )
}

export default UsernamesWorkspace