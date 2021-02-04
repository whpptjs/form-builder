import CustomFormEditor from './components/Form/Editors/CustomFormEditor';
import FormFieldEditor from './components/Form/Editors/FormFieldEditor';
import FormDashboard from './components/FormDashboard';

export default {
  name: 'CustomForm',
  dashboard: {
    name: 'formDashboard',
    label: 'Form Dashboard',
    component: FormDashboard,
  },
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
