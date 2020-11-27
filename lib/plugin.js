import customFormPlugin from './plugins/customFormPlugin';
import formFieldPlugin from './plugins/formFieldPlugin';

export default async function () {
  await $whppt.addPlugin(customFormPlugin);
  await $whppt.addPlugin(formFieldPlugin);
}
