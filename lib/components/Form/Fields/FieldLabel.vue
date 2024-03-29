<template>
  <label class="whppt-form-label" :for="inEditor ? '' : id">
    <div v-if="label || inEditor" class="whppt-form-label-text">{{ label }}</div>
    <div v-else class="whppt-form-label-text"></div>
    <span class="whppt-form-label-error" :class="{ 'whppt-form-label-error--active': showError }">
      {{ errorMessage }}
    </span>
  </label>
</template>

<script>
import { mapState } from 'vuex';
import { has } from 'lodash';

export default {
  name: 'FieldLabel',
  props: {
    field: { type: Object, default: () => ({}) },
    validations: { type: Object, default: () => ({}) },
    id: { type: String, default: '' },
    // TODO: Shift the logic for validation messages to the fields by passing fieldErrorMessage. See email field as an example
    fieldErrorMessage: { type: String, default: '' },
  },
  computed: {
    ...mapState('whppt/editor', ['activeMenuItem', 'inEditor']),
    inEditor() {
      return this.activeMenuItem === 'select';
    },
    label() {
      const postfix = this.required ? '*' : '';
      const label = this.field.label || 'Field label';
      return `${label}${postfix}`;
    },
    required() {
      if (!has(this.field, 'required')) return false;
      return typeof this.field.required === 'function' ? this.field.required() : this.field.required;
    },
    showError() {
      if (this.fieldErrorMessage) return true;
      return this.validations.$error || false;
    },
    errorMessage() {
      if (this.fieldErrorMessage) return this.fieldErrorMessage;

      if (!this.field.required) return '';
      if (!has(this.field, 'message')) this.getFieldBasedMessages();
      const msg = typeof this.field.message === 'function' ? this.field.message(this.validations) : this.field.message;
      return msg || this.getFieldBasedMessages();
    },
  },
  methods: {
    getFieldBasedMessages() {
      if (this.field.maxLength && !this.validations.maxLength) return this.getMaxLengthMessage();
      return 'This field is required';
    },
    getMaxLengthMessage() {
      const maxLengthMsg = size => `This field cannot exceed ${size} characters`;
      if (!(this.validations.$params && this.validations.$params.maxLength)) return 'This field is too long';
      if (this.field.maxLength) return maxLengthMsg(this.validations.$params.maxLength.max);
      return;
    },
  },
};
</script>
