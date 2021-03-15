import CustomFormEditor from './components/Form/Editors/CustomFormEditor';
import SuccessEmailEditor from './components/Form/Editors/SuccessEmailEditor';
import FormFieldEditor from './components/Form/Editors/FormFieldEditor';
import FormSubmissions from './components/FormSubmissions';

export default {
  name: 'CustomForm',
  dashboard: {
    name: 'formSubmissions',
    label: 'Form Submissions',
    component: FormSubmissions,
  },
  editors: [
    {
      label: 'Form Editor',
      name: 'customForm',
      component: CustomFormEditor,
    },
    {
      label: 'Form Success Email Editor',
      name: 'formSuccessEmail',
      component: SuccessEmailEditor,
    },
    {
      label: 'Form Field Editor',
      name: 'formField',
      component: FormFieldEditor,
    },
  ],
};
