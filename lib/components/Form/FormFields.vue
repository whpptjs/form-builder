<template>
  <div :class="{ 'in-editor': inEditor }" class="whppt-form__fields">
    <div
      v-for="(field, index) in visibleFields"
      :key="index"
      :class="
        field.halfWidth || field.type === 'checkbox' || field.type === 'multipleChoice'
          ? 'whppt-form__field-width-half'
          : 'whppt-form__field-width-full'
      "
    >
      <div>
        <!-- {{ field.name && validations.formValues[field.name] }}
        {{ field }} -->
        <component
          :is="getComponent(field.type)"
          :field="field"
          :disable-editing="true"
          :value="formValues[field.name]"
          :show-error="
            (field.name && validations.formValues[field.name] && validations.formValues[field.name].$error) || false
          "
          :validations="validations && validations.formValues && validations.formValues[field.name]"
          :clear-recaptcha="clearRecaptcha"
          @field-updated="$emit('field-updated', $event)"
        />
        <slot :field="field" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FormCheckbox from './Fields/Checkbox';
import FormEmailField from './Fields/EmailField';
import FormMultipleChoiceField from './Fields/MultipleChoiceField';
import FormSelectField from './Fields/SelectField';
import FormTextArea from './Fields/TextArea';
import FormTextField from './Fields/TextField';
import FormPhoneField from './Fields/PhoneField';
import FormDateField from './Fields/DateField';
import FormRecaptcha from './Fields/Recaptcha';

export default {
  name: 'CustomFormFields',
  components: {
    FormCheckbox,
    FormEmailField,
    FormMultipleChoiceField,
    FormSelectField,
    FormTextArea,
    FormTextField,
    FormPhoneField,
    FormRecaptcha,
    FormDateField,
  },
  props: {
    formValues: { type: Object, default: () => ({}) },
    fields: { type: Array, default: () => [] },
    validations: { type: Object, default: () => ({}) },
    clearRecaptcha: { type: Boolean, default: false },
  },
  computed: {
    ...mapGetters(['inEditor']),
    visibleFields() {
      return this.fields.filter(f => !(f.hidden && f.hidden(this.formValues)));
    },
  },
  methods: {
    getComponent(type) {
      switch (type) {
        case 'text':
          return 'FormTextField';
        case 'textArea':
          return 'FormTextArea';
        case 'checkbox':
          return 'FormCheckbox';
        case 'select':
          return 'FormSelectField';
        case 'email':
          return 'FormEmailField';
        case 'multipleChoice':
          return 'FormMultipleChoiceField';
        case 'captcha':
          return 'FormRecaptcha';
        case 'phone':
          return 'FormPhoneField';
        case 'date':
          return 'FormDateField';
        default:
          return 'FormTextField';
      }
    },
  },
};
</script>
