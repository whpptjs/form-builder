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
          v-whppt-list="{ data: content, addNew }"
          data-property="fields"
          :class="{ 'in-editor': inEditor }"
          class="whppt-form__fields"
        >
          <div v-if="!content.fields.length" class="whppt-form__field-config">Add fields</div>
          <div
            v-for="(field, index) in content.fields"
            :key="index"
            :class="
              field.halfWidth || field.type === 'checkbox' || field.type === 'multipleChoice'
                ? 'whppt-form__field-width-half'
                : 'whppt-form__field-width-full'
            "
          >
            <div>
              <div v-if="!field.name && inEditor">Missing field name</div>
              <component
                :is="getComponent(field.type)"
                :field="field"
                :show-error="(field.name && field.required && $v.formValues[field.name].$error) || false"
                @field-updated="updateField"
              />
            </div>
          </div>
        </div>
        <div v-if="error" class="whppt-form__validation">
          {{ error.message }}
          <div v-for="e in error.validationErrors" :key="e">{{ e }}</div>
        </div>

        <div v-if="inEditor" v-custom-form="content" class="whppt-form__form-config">Edit form config</div>
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
        </div>
      </div>
      <div class="whppt-form__gutter" />
    </div>
  </div>
</template>

<script>
import { forEach, uniqBy, find } from 'lodash';
import { mapActions, mapState } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

import FormCheckbox from './Fields/Checkbox';
import FormEmailField from './Fields/EmailField';
import FormMultipleChoiceField from './Fields/MultipleChoiceField';
import FormSelectField from './Fields/SelectField';
import FormTextArea from './Fields/TextArea';
import FormTextField from './Fields/TextField';
import FormRecaptcha from './Fields/Recaptcha';

export default {
  name: 'WhpptFormsForm',
  components: {
    FormCheckbox,
    FormEmailField,
    FormMultipleChoiceField,
    FormSelectField,
    FormTextArea,
    FormTextField,
    FormRecaptcha,
  },
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
  }),
  computed: {
    ...mapState('whppt-nuxt/editor', ['activeMenuItem']),
    inEditor() {
      return this.activeMenuItem === 'select';
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
  },
  methods: {
    ...mapActions('whppt-nuxt/editor', ['pushSelectedComponentState']),
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
        default:
          return 'FormTextField';
      }
    },
    updateField(event) {
      if (!event.name) return;
      this.$set(this.formValues, event.name, event.value);
      this.success = false;
    },
    verifyRecaptcha(response) {
      this.formValues.recaptcha = response;
    },
    submit() {
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
            recipient: this.content.recipient,
            ccs: this.content.ccs,
          },
          form: this.formValues,
        })
        .then(() => {
          this.loading = false;
          this.success = true;
        })
        .catch(err => {
          this.loading = false;
          this.success = false;
          this.error = err;
        });
    },
  },
  validations() {
    const validations = { formValues: {} };

    forEach(this.content.fields, field => {
      const restrictions = {};
      if (field.required && field.type !== 'checkbox') restrictions.required = required;
      if (field.type === 'email' && field.required) restrictions.email = email;
      if (field.type === 'checkbox' && field.required)
        restrictions.checked = val => {
          return val === true;
        };

      if (Object.keys(restrictions).length) validations.formValues[field.name] = restrictions;
    });

    return validations;
  },
};
</script>

<style>
.whppt-form {
  display: flex;
}

.whppt-form__gutter {
  display: none;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 8.333333%;
}

.whppt-form__content {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 100%;
}

.whppt-form__title {
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.whppt-form__validation {
  color: red;
}

.whppt-form__form-config {
  font-style: italic;
  margin-bottom: 1rem;
}

.whppt-form__actions {
  align-items: center;
  display: flex;
}

.whppt-form__primary {
  font-weight: 500;
  padding: 1rem 2.5rem;
  background-color: limegreen;
  border: 2px solid limegreen;
  transition: background-color 0.15s ease, border 0.15s ease, color 0.15s ease;
  will-change: background-color, border, color;
  color: white;
}

.whppt-form__primary:hover,
.whppt-form__primary:focus {
  transition: background-color 0.15s ease, border 0.15s ease, color 0.15s ease;
  will-change: background-color, border, color;
  background-color: white;
  color: limegreen;
}

.whppt-form__primary.in-editor {
  cursor: pointer;
}

.whppt-form__secondary {
  font-weight: 500;
  padding: 1rem 2.5rem;
  margin-left: 2rem;
  background-color: transparent;
  transition: color 0.15s ease;
  will-change: color;
  color: inherit;
}

.whppt-form__secondary:hover,
.whppt-form__secondary:focus {
  color: dodgerblue;
}

.whppt-form__fields {
  justify-content: space-between;
  flex-wrap: wrap;
  display: flex;
}

.whppt-form__fields.in-editor {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.whppt-form__field-config {
  font-style: italic;
}

.whppt-form__field-width-half {
  width: 100%;
}

.whppt-form__field-width-full {
  width: 100%;
}

@media only screen and (min-width: 1024px) {
  .whppt-form__gutter {
    display: block;
  }
  .whppt-form__content {
    width: 83.333333%;
  }
  .whppt-form__title {
    font-size: 1.25rem;
  }
  .whppt-form__field-width-half {
    width: 45%;
  }
}
</style>
