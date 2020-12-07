<template>
  <div>
    <!-- eslint-disable-next-line -->
    <% if (options.siteKey) { %>
    <div v-form-field="field" class="whppt-form-captcha">
      <field-label :field="field" :show-error="showError"></field-label>
      <vue-recaptcha
        sitekey="<%= options.siteKey %>"
        :load-recaptcha-script="true"
        @verify="onVerify"
        @expired="onExpired"
        @error="onError"
      ></vue-recaptcha>
    </div>
    <!-- eslint-disable-next-line -->
    <% } %>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import FieldLabel from './FieldLabel';

export default {
  name: 'Recaptcha',
  components: { VueRecaptcha, FieldLabel },
  props: { field: { type: Object, default: () => ({}) }, showError: { type: Boolean, default: false } },
  data: () => ({
    value: '',
  }),
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
