<template>
  <whppt-dialog :is-active="isActive">
    <div class="form-info">
      <whppt-button class="whppt-filters-button" @click="$emit('close')">Close</whppt-button>
      <div v-for="(value, key) in item" :key="key" class="dialog-item">
        <div class="dialog-key">{{ `${key}: ` }}</div>
        <div>{{ value }}</div>
      </div>
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

<style scoped>
.whppt-filters-button {
  margin-left: auto;
  margin-bottom: 0.5rem;
}

.form-info {
  padding: 2rem;
}

.dialog-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.dialog-key {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin-right: 1rem;
}
</style>
