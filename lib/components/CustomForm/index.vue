<template>
  <div>
    <div class="container flex">
      <div class="hidden lg:block w-1/12" />
      <div class="w-full lg:w-10/12">
        <div
          v-if="(content.title && content.title !== '<p></p>') || inEditor"
          v-whppt-formatted-text="content"
          data-property="title"
          class="text-lg lg:text-xl mb-8"
          v-html="content.title && content.title !== '<p></p>' ? content.title : 'Form Title'"
        />
        <div
          v-whppt-list="{ data: content, addNew }"
          data-property="fields"
          :class="{ 'py-4': inEditor }"
          class="flex flex-wrap justify-between"
        >
          <div v-if="!content.fields.length" class="italic">Add fields</div>
          <div
            v-for="(field, index) in content.fields"
            :key="index"
            :class="
              field.halfWidth || field.type === 'checkbox' || field.type === 'multipleChoice'
                ? 'w-full lg:w-4.5/10'
                : 'w-full'
            "
          >
            <div>
              <div v-if="!field.name && inEditor">Missing field name</div>
              <component
                :is="getComponent(field.type)"
                :field="field"
                :show-error="(field.name && field.required && $v.formValues[field.name].$error) || false"
                @fieldUpdated="updateField"
              />
            </div>
          </div>
        </div>
        <div v-if="error" class="validationErrors">
          {{ error.message }}
          <div v-for="e in error.validationErrors" :key="e">{{ e }}</div>
        </div>

        <div v-if="inEditor" v-custom-form="content" class="mb-4 italic">Edit form config</div>
        <div v-if="configError && inEditor">{{ configError }}</div>
        <div v-if="!configError" class="flex items-center">
          <div v-whppt-text="content" data-property="primaryButtonText" class="cursor-pointer" @click="submit">
            <div v-if="success" :style="{ color: theme.secondary }">Success!</div>
            <primary-cta
              v-else
              :disable-editing="true"
              :to="{ text: content.primaryButtonText || 'Send enquiry' }"
            ></primary-cta>
          </div>
          <secondary-cta v-if="content.secondaryLink.href || inEditor" :to="content.secondaryLink" class="ml-8" />
        </div>
      </div>
      <div class="hidden lg:block w-1/12" />
    </div>
  </div>
</template>

<script>
import { forEach, uniqBy, find } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'CustomForm',
  props: { content: { type: Object, default: () => ({}) } },
  data: () => ({
    formValues: {},
    success: false,
    loading: false,
    error: undefined,
  }),
  computed: {
    ...mapGetters(['inEditor', 'theme']),
    configError() {
      if (!this.content.formName) return 'Form name missing';
      if (!this.content.recipientEmail) return 'Recipient email missing';
      if (!this.content.recipientName) return 'Recipient name missing';
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
          return 'FormMultipleChoice';
        default:
          return 'FormTextField';
      }
    },
    updateField(event) {
      if (!event.name) return;
      this.$set(this.formValues, event.name, event.value);
      this.success = false;
    },
    submit() {
      // if (this.inEditor) return;
      // this.success = false;
      this.$v.$touch();
      if (this.$v.$invalid) return;

      this.error = undefined;
      this.loading = true;
      this.success = false;
      this.$axios
        .$post('/api/forms/submit', {
          settings: {
            name: this.content.formName,
            subject: this.content.subject,
            fields: this.content.fields,
            recipient: {
              name: this.content.recipientName,
              email: this.content.recipientEmail,
            },
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
