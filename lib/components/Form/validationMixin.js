import { forEach } from 'lodash';
import { validationMixin } from 'vuelidate';
import { required, email, maxLength } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  methods: {
    getValidations(fields) {
      const validations = { formValues: {} };

      forEach(fields, field => {
        const restrictions = {};
        const isRequired = typeof field.required === 'function' ? field.required() : field.required;

        if (isRequired && field.type !== 'checkbox') restrictions.required = required;
        if (field.type === 'email' && isRequired) restrictions.email = email;
        if (field.type === 'checkbox' && isRequired)
          restrictions.checked = val => {
            return val === true;
          };

        if (field.maxLength) {
          restrictions.maxLength = maxLength(field.maxLength);
        }

        if (Object.keys(restrictions).length) validations.formValues[field.name] = restrictions;
      });

      return validations;
    },
  },
};
