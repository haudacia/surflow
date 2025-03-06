import { handleDeleteForm } from '../../utils/api';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/DropDown/Dropdown';

const FormCard = ({ form }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDelete = (formId) => {
    deleteFormByIdMutation.mutate(formId);
  };

  const deleteFormByIdMutation = useMutation(['forms'], handleDeleteForm, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('forms');
      console.log('Form deleted successfully', data);
    },
    onError: (error) => {
      console.error('Error deleting form', error);
    },
  });

  return (
    <div
      className='group flex h-fit p-4 border-black border-[1px] shadow- cursor-pointer hover:bg-c2 transition-all duration-300 hover:bg-c2 shadow-crisp'
      onClick={() => navigate(`/createform/${form._id}`)}
      style={{ aspectRatio: '1' }}
    >
      <h1 className='overflow-auto w-full h-full text-lg'>{form.title}</h1>
      <div className='opacity-0 group-hover:opacity-100 group-hover:transition-opacity duration-300'>
        <Dropdown form={form} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default FormCard;
