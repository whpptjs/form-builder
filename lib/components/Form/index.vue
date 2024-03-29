<template>
  <div>
    <div class="whppt-form" :class="computedClasses">
      <div class="whppt-form__gutter" />
      <div class="whppt-form__content">
        <div
          v-if="(content.title && content.title !== '<p></p>') || inEditor"
          v-whppt-formatted-text="content"
          data-property="title"
          class="whppt-form__title"
          v-html="content.title && content.title !== '<p></p>' ? content.title : 'Form Title'"
        />
        <div
          v-if="inEditor"
          class="whppt-form__field-config"
          v-whppt-list="{ data: content, addNew }"
          data-property="fields"
        >
          Manage fields
        </div>
        <!-- :clear-recaptcha="clearRecaptcha" -->
        <form-fields
          :form-values="formValues"
          :fields="content.fields"
          :validations="$v"
          @field-updated="updateField"
          :disable-editing="false"
          ref="formFields"
        />
        <div v-if="error" class="whppt-form__validation">
          <span class="whppt-form__validation--error">{{ errorMessage }}</span>
          <div v-for="e in error.validationErrors" :key="e">{{ e }}</div>
        </div>

        <div v-if="inEditor" v-custom-form="content" class="whppt-form__form-config">Edit form config</div>
        <div v-if="inEditor" v-whppt-rich-text="content" data-property="successMessage" class="whppt-form__form-config">
          Edit Success Message
        </div>
        <div
          v-if="inEditor"
          v-form-success-email="{ content, formFields: content.fields }"
          class="whppt-form__form-config"
        >
          Edit success email config
        </div>
        <div v-if="configError && inEditor">{{ configError }}</div>
        <div v-if="!configError" class="whppt-form__actions flex items-center">
          <button
            v-whppt-text="content"
            data-property="primaryButtonText"
            class="whppt-form__primary"
            :class="{ 'in-editor': inEditor }"
            @click="submit"
          >
            <span v-if="success">Success!</span>
            <span v-else>{{ content.primaryButtonText || 'Send enquiry' }}</span>
          </button>
          <whppt-link
            v-if="content.secondaryLink.href || inEditor"
            v-whppt-link="content.secondaryLink"
            :to="content.secondaryLink"
            class="whppt-form__secondary ml-8"
          >
            {{ content.secondaryLink.text || 'Secondary Link' }}
          </whppt-link>
          <div
            v-if="success"
            v-whppt-rich-text="content"
            data-property="successMessage"
            class="whppt-form__success-message ml-8"
            :class="{ 'in-editor': inEditor }"
            v-html="content.successMessage && content.successMessage !== '<p></p>' ? content.successMessage : 'Success'"
            @click="submit"
          ></div>
          <!-- <div
            v-if="success"
            v-whppt-text="content"
            data-property="successMessage"
            class="whppt-form__success-message ml-8"
            :class="{ 'in-editor': inEditor }"
            @click="submit"
          >
            <span>{{ content.successMessage }}</span>
          </div> -->
        </div>
      </div>
      <div class="whppt-form__gutter" />
    </div>
  </div>
</template>

<script>
import { forEach, uniqBy, find } from 'lodash';
import { mapActions, mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import FormFields from './FormFields';

export default {
  name: 'WhpptFormsForm',
  components: {
    FormFields,
  },
  mixins: [validationMixin],
  props: {
    content: { type: Object, default: () => ({}) },
    container: { type: Boolean, default: true },
    customClass: { type: String, default: '' },
  },
  data: () => ({
    formValues: {},
    success: false,
    loading: false,
    error: undefined,
    // clearRecaptcha: false,
  }),
  computed: {
    ...mapState('whppt/editor', ['activeMenuItem']),
    inEditor() {
      return this.activeMenuItem === 'select';
    },
    visibleFields() {
      return this.content.fields.filter(f => !(f.hidden && f.hidden(this.formValues)));
    },
    computedClasses() {
      const _classes = { container: this.container };

      if (this.customClass) _classes[this.customClass] = this.customClass;

      return _classes;
    },
    configError() {
      if (!this.content.identifier) return 'Identifier missing';
      if (!this.content.recipient) return 'Recipient missing';
      if (!this.content.subject) return 'Subject missing';

      if (find(this.content.fields, f => !f.name)) return 'All fields need names configured';

      if (uniqBy(this.content.fields, 'name').length !== this.content.fields.length)
        return 'Fields cannot have duplicate names';

      return '';
    },
    errorMessage() {
      return this.error?.response?.data?.error?.message || this.error.message;
    },
  },
  methods: {
    ...mapActions('whppt/editor', ['pushSelectedComponentState']),
    addNew() {
      this.pushSelectedComponentState({
        path: 'fields',
        value: {
          type: '',
          placeholder: '',
          label: '',
          name: '',
          options: [],
          required: false,
          halfWidth: false,
        },
      });
    },
    updateField(event) {
      if (!event.name) return;
      this.$set(this.formValues, event.name, event.value);
      this.success = false;
    },
    // verifyRecaptcha(response) {
    //   this.formValues.recaptcha = response;
    // },
    submit() {
      if (this.inEditor) return;

      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.error = undefined;
      this.loading = true;
      this.success = false;

      this.$axios
        .$post('/api/forms/submit', {
          settings: {
            subject: this.content.subject,
            fields: this.content.fields,
            identifier: this.content.identifier,
            recipient: this.content.recipient,
            ccs: this.content.ccs,
            successEmailText: this.content.successEmailText,
            successEmailSubject: this.content.successEmailSubject,
            submitterEmailField: this.content.submitterEmailField,
          },
          form: this.formValues,
        })
        .then(() => {
          this.loading = false;
          this.clearForm();

          if (process.client && this.content.trackInGA) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'formSubmission',
              formName: this.content.identifier,
            });
          }
          this.success = true;
        })
        .catch(err => {
          this.loading = false;
          this.success = false;
          this.error = err;
        });
    },
    clearForm() {
      this.$v.$reset();
      this.formValues = {};
      this.$refs.formFields.resetRecaptcha();
      this.success = false;
    },
  },
  validations() {
    const validations = { formValues: {} };

    forEach(this.content.fields, field => {
      const restrictions = {};
      if (field.required && field.type !== 'checkbox' && field.type !== 'captcha') restrictions.required = required;
      if (field.type === 'email' && field.required) restrictions.email = email;
      if (field.type === 'checkbox' && field.required)
        restrictions.checked = val => {
          return val === true;
        };
      if (field.type === 'captcha') restrictions.required = required;

      if (Object.keys(restrictions).length) validations.formValues[field.name] = restrictions;
    });

    return validations;
  },
};
</script>
