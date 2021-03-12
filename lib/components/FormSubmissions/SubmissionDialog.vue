<template>
  <whppt-dialog :is-active="isActive">
    <div class="form-info">
      <whppt-button class="whppt-filters-button" @click="$emit('close')">Close</whppt-button>
      <table class="submission-dialog__table">
        <tbody>
          <tr class="headers">
            <td class="key">Form Field</td>
            <td class="value">Form Value</td>
          </tr>
          <tr v-for="(value, key) in item" :key="key">
            <td class="key">
              <div>
                {{ `${key}` }}
              </div>
            </td>
            <td class="value">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </whppt-dialog>
</template>

<script>
import WhpptDialog from '@whppt/nuxt/lib/components/ui/Dialog.vue';
import WhpptButton from '@whppt/nuxt/lib/components/ui/Button.vue';

export default {
  name: 'FormSubmissionDialog',
  components: {
    WhpptDialog,
    WhpptButton,
  },
  props: { isActive: { type: Boolean, default: false }, item: { type: Object, default: () => ({}) } },
};
</script>

<style scoped lang="scss">
$gray-500: #a0aec0;
$gray-600: #718096;
$gray-700: #4a5568;

.whppt-filters-button {
  margin-left: auto;
  margin-bottom: 2rem;
}

.form-info {
  padding: 2rem;
}

.submission-dialog__table {
  border: 1px solid white;
  width: 100%;
  tbody {
    tr {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid $gray-500;
      padding: 0.5rem;
    }
    tr:nth-child(even) {
      background-color: $gray-700;
    }

    tr.headers td {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    td.key {
      width: 50%;
      div {
        padding-right: 1rem;
      }
    }

    td.value {
      width: 50%;
    }
  }
}

.dialog-key {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin-right: 1rem;
}
</style>
