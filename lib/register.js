import CustomForm from './components/CustomForm';
// import Checkbox from './components/CustomForm/Checkbox';
// import EmailField from './components/CustomForm/EmailField';
// import FieldLabel from './components/CustomForm/FieldLabel';

export default function (Vue, options = {}) {
  options.prefix = options.prefix || 'wfb-';

  Vue.component(`${options.prefix}custom-form`, CustomForm);

  // const components = [
  //   { name: 'custom-form', file: CustomForm },
  // { name: 'checkbox', file: Checkbox },
  // ];

  // for (const component of components) {
  // Vue.component(`${options.prefix}${component.name}`, component.file);
  // }
}
