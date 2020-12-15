<template>
  <div v-if="siteKey" v-form-field="field" class="whppt-form-captcha">
    <field-label :field="field" :show-error="showError"></field-label>
    <vue-recaptcha
      :sitekey="siteKey"
      :load-recaptcha-script="true"
      @verify="onVerify"
      @expired="onExpired"
      @error="onError"
    ></vue-recaptcha>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import FieldLabel from './FieldLabel';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default {
  name: 'Recaptcha',
  components: { VueRecaptcha, FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    value: '',
    options,
  }),
  computed: {
    siteKey() {
      return this.$config.recaptcha_sitekey || options.recaptcha_sitekey;
    },
  },
  methods: {
    onVerify(response) {
      this.value = response;
      this.$emit('field-updated', { name: this.field.name, value: response });
    },
    onExpired() {
      this.$emit('field-updated', { name: this.field.name, value: '' });
    },
    onError() {
      this.$emit('error');
    },
  },
};
</script>

<style scoped>
.whppt-form-captcha {
  margin-bottom: 2rem;
}
</style>
