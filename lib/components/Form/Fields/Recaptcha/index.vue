<template>
  <div v-if="siteKey" v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-captcha">
    <div v-if="inEditor">
      Recptcha: {{ siteKey }}
      <field-label :field="field" :fieldErrorMessage="validationError" :id="field.name"></field-label>
    </div>
    <recaptcha-control
      ref="captcha"
      @input="value => $emit('field-updated', { name: this.field.name, value })"
      :error="validationError"
    />
    <span v-if="validationError" class="form-section__field--error"> Please complete the recaptcha </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FieldLabel from '@whppt/form-builder/lib/components/Form/Fields/FieldLabel';
import RecaptchaControl from './Control';

export default {
  name: 'RecaptchaField',
  components: { FieldLabel, RecaptchaControl },
  props: {
    field: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
    validations: { type: Object, default: () => ({}) },
    disableEditing: { type: Boolean, default: false },
  },
  computed: {
    ...mapGetters(['inEditor']),
    siteKey() {
      return this.$config.recaptcha_sitekey;
    },
    validationError() {
      if (!(this.field.required && this.validations.$dirty)) return '';
      if (!this.validations.$dirty) return '';
      if (!this.validations.required) return 'This field is required';
      return '';
    },
  },
  methods: {
    resetCaptcha() {
      this.$refs.captcha.reset();
    },
  },
};
</script>
