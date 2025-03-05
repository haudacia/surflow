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
      className='relative h-1/4 w-full justify-between items-end cursor-pointer border-b-[1px] border-black text-xl flex justify-center flex-wrap p-2 shadow-black bg- hover:bg-onHoverColor transition-all duration-500 hover:bg-onHoverColor'
      onClick={() => navigate(`/createform/${form._id}`)}
    >
      <p className='overflow-auto w-3/4'>{form.title}</p>
      <Dropdown form={form} handleDelete={handleDelete} />
    </div>
  );
};

export default FormCard;
