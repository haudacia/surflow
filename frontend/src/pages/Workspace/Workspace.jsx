import { useNavigate } from 'react-router-dom';
import FormCard from '../CreateForm/FormCard.jsx';
import { useForms } from '../../hooks/useForms.js';
import { emptyWorkspaceMessage } from '../../utils/utils.js';
import MediumButton from '../../components/Buttons/MediumButton.jsx';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { api } from '../../utils/api.js';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import { useQueryClient } from 'react-query';


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
          navigate(`/createform/${response.data._id}`)
        } else {
          console.error('Form creation was successful but no ID was returned');
        }
      }).catch((error) => console.error('Error creating form:', error))
  };

  return (
    <div className="grid grid-cols-[33%_33%_33%] grid-rows-4 h-screen min-w-screen bg-blurry bg-cover">
      <UserNavbar isCreateMode={false} />
      <button className='row-start-1 row-end-1 col-start-2 w-full hover:bg-onHoverColor border-b-[1px] border-black py-2 text-xl align-center' onClick={handleSubmit(handleCreate)}>
        create new form
      </button>

      <div className="row-span-4 h-full overflow-y-scroll border-l-black border-l-[1px]">
        {isLoading ? (
          <p>Loading forms...</p>
        ) : forms && forms.length > 0 ? (
          forms.map((form) => <FormCard key={form._id} form={form} />)
        ) : (
          <p>{emptyWorkspaceMessage}</p>
        )}
      </div>

    </div >
  );
});

export default Workspace;