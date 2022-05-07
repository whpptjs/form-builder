<template>
  <div v-if="siteKey" v-form-field="field" v-whppt-editor-enabled="!disableEditing" class="whppt-form-captcha">
    <field-label :field="field" :validations="validations"></field-label>
    <vue-recaptcha
      ref="recaptcha"
      :sitekey="siteKey"
      :load-recaptcha-script="true"
      @verify="onVerify"
      @expired="onExpired"
      @error="onError"
    ></vue-recaptcha>
  </div>
</template>

<script>
import { VueRecaptcha } from 'vue-recaptcha';
import FieldLabel from '@whppt/form-builder/lib/components/Form/Fields/FieldLabel';

export default {
  name: 'Recaptcha',
  components: { VueRecaptcha, FieldLabel },
  props: {
    field: { type: Object, default: () => ({}) },
    validations: { type: Object, default: () => ({}) },
    value: { type: String, default: '' },
    disableEditing: { type: Boolean, default: false },
    clearRecaptcha: { type: Boolean, default: false },
  },

  computed: {
    siteKey() {
      return this.$config.recaptcha_sitekey;
    },
  },
  watch: {
    clearRecaptcha() {
      this.reset();
    },
  },
  methods: {
    onVerify(response) {
      this.$emit('field-updated', { name: this.field.name, value: response });
    },
    onExpired() {
      this.$emit('field-updated', { name: this.field.name, value: '' });
    },
    onError() {
      this.$emit('error');
    },
    reset() {
      this.$emit('field-updated', { name: this.field.name, value: '' });
      this.$refs.recaptcha.reset();
    },
  },
};
</script>
