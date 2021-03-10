<template>
  <whppt-drawer :active="active" position="right">
    <div class="whppt-form__filters">
      <div class="whppt-filters-wrapper">
        <whppt-button class="whppt-filters-button" @click="$emit('close')">Hide Filters</whppt-button>
        <whppt-input
          id="dashboard-filter-identifier"
          :value="filters.identifier"
          class="whppt-dashboard__filter"
          label="Identifier"
          placeholder="Form Identifier"
          clearable
          @input="updateFilters('identifier', $event)"
        />
        <whppt-datepicker
          :value="filters.fromDate"
          label="From Date"
          placeholder="Enter a date"
          @input="updateFilters('fromDate', $event)"
        />
        <whppt-datepicker
          :value="filters.toDate"
          label="To Date"
          placeholder="Enter a date"
          @input="updateFilters('toDate', $event)"
        />
      </div>
    </div>
  </whppt-drawer>
</template>

<script>
import WhpptInput from '@whppt/nuxt/lib/components/ui/Input.vue';
import WhpptDrawer from '@whppt/nuxt/lib/components/ui/Drawer.vue';
import WhpptButton from '@whppt/nuxt/lib/components/ui/Button.vue';
import WhpptDatepicker from '@whppt/nuxt/lib/components/ui/Datepicker.vue';

export default {
  name: 'SubmissionsFilters',
  components: {
    WhpptInput,
    WhpptDrawer,
    WhpptButton,
    WhpptDatepicker,
  },
  props: { active: { type: Boolean, default: false }, filters: { type: Object, default: () => ({}) } },
  methods: {
    updateFilters(field, value) {
      this.$emit('updateFilter', { field, value });
    },
  },
};
</script>

<style scoped>
.whppt-form__filters {
  padding: 1rem;
}

.whppt-filters-wrapper {
  min-height: 3rem;
  width: 100%;
}

.whppt-filters-button {
  margin-left: auto;
  margin-bottom: 0.5rem;
}

.whppt-dashboard__filter {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
