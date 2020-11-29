import CustomFormEditor from './components/Form/Editors/CustomFormEditor';
import FormFieldEditor from './components/Form/Editors/FormFieldEditor';

export default {
  name: 'CustomForm',
  editors: [
    {
      label: 'Form Editor',
      name: 'customForm',
      component: CustomFormEditor,
    },
    {
      label: 'Form Field Editor',
      name: 'formField',
      component: FormFieldEditor,
    },
  ],
};
