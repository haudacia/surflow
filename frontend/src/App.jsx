import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import { Workspace } from './pages/Workspace/Workspace.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import { getUserToken } from './utils/localStorage.js';
import Login from './pages/Login/Login.jsx';
import { CreateForm } from './pages/CreateForm/CreateForm.jsx';
import ResponseForm from './pages/ResponsePage/ResponseForm.jsx';
import FormAnswers from './pages/FormAnswers/FormAnswers.jsx';
import UserAccount from './pages/UserAccount/UserAccount.jsx';
import { useUserProvider } from './context/UserContext.jsx';


function AppRouter() {
  const { userId } = useUserProvider();
  const token = getUserToken();

  const PrivateRoutes = () => {
    return (
      token ? <Outlet/> : <Navigate to='/login'/>
    )
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={token ? <Workspace /> : <Navigate to="/home" />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoutes/>}>
            <Route path='/workspace' element={<Workspace />} />
            <Route path='/formAnswers' element={<FormAnswers />} />
            <Route path='/responseform/:id' element={<ResponseForm />} />
            <Route path='/createform/:id?' element={<CreateForm />} />
            <Route path='/user/:id/account' element={<UserAccount />} />
        </Route>        
      </Route>
    ),
  );

  return <RouterProvider router={router} />;
}

function App() {
  return <AppRouter />;
}

export default App;
