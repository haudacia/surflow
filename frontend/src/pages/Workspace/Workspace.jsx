import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard.jsx';
import { useForms } from '../../hooks/useForms.js';
import { emptyWorkspaceMessage } from '../../utils/utils.js';
import MediumButton from '../../components/Buttons/MediumButton.jsx';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { api } from '../../utils/api.js';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import { useQueryClient } from 'react-query';
import SmallButton from '../../components/Buttons/SmallButton.jsx';


export const Workspace = withCustomFormProvider(() => {
  const { handleSubmit, reset } = useCustomFormProvider();
  const navigate = useNavigate();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();

  const handleCreate = (data) => {
    api()
      .post('/form', data)
      .then((response) => {
        if (response && response.data && response.data._id) {
          reset(data);
          queryClient.invalidateQueries('forms');
          navigate(`/createform/${response.data._id}`);
        } else {
          console.error('Form creation was successful but no ID was returned');
        }
      }).catch((error) => console.error('Error creating form:', error));
  };

  return (
    <div className="grid grid-rows-[12%_88%] h-screen min-w-screen bg-c1 bg-cover">
      <UserNavbar isCreateMode={false} isWorkspace={true}>
        <SmallButton
          onClick={handleSubmit(handleCreate)}
          text='new form'
        />
      </UserNavbar>

      <div className='px-28 gap-4 pt-4 grid md:grid-cols-3 sm:grid-cols-2 overflow-auto'>
        {isLoading ? (
          <p>Loading forms...</p>
        ) : forms && forms.length > 0 ? (
          forms.map((form) => <FormCard key={form._id} form={form} />)
        ) : (
          <p>{emptyWorkspaceMessage}</p>
        )}
      </div>
    </div>
  );
});


export default Workspace;