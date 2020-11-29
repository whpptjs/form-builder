import Vue from 'vue';
import CustomForm from './components/Form';
import customFormPlugin from './whppt_plugin';

Vue.component(`WFormsForm`, CustomForm);

export default function ({ $whppt }) {
  $whppt.addPlugin(customFormPlugin);
}
