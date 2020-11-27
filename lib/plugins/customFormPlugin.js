import CustomFormEditor from '../components/CustomForm/Editors/CustomFormEditor';

export default {
  name: 'CustomForm',
  editors: [
    {
      label: 'Custom Form Editor',
      name: 'customForm',
      component: CustomFormEditor,
    },
  ],
};
