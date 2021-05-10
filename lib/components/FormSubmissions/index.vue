<template>
  <div class="whppt-dashboard__wrapper">
    <div class="whppt-dashboard__form">
      <div class="whppt-filters-wrapper">
        <whppt-checkbox v-model="showDraftSubmissions" label="Show draft Submissions" @change="fetchFormData(true)" />
        <whppt-button v-if="!filtersVisible" class="whppt-filters-button" @click="filtersVisible = true">
          Show Filters
        </whppt-button>
      </div>
      <whppt-table
        :headers="headers"
        :items="items"
        dense
        :page.sync="currentPage"
        :per-page.sync="limit"
        :total="total"
        @update:page="fetchFormData()"
        @update:perPage="fetchFormData(true)"
      >
        <template v-slot:item.viewSubmission="{ item }">
          <a class="whppt-form__input" href="javascript:void(0);" @click="viewFormInput(item)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              focusable="false"
              role="img"
              width="1rem"
              height="1rem"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              style="transform: rotate(360deg)"
            >
              <path
                d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </template>
      </whppt-table>
      <div v-if="items.length" style="display: flex; justify-content: flex-end; margin-top: 0.5rem">
        <vue-csv-downloader :data="csvSubmissions" download-name="Form Submissions Export.csv">
          <whppt-button> Export to CSV </whppt-button>
        </vue-csv-downloader>
      </div>
    </div>
    <submissions-filters
      :active="filtersVisible"
      :filters="filters"
      @updateFilter="updateFilter"
      @clearFilters="clearFilters"
      @close="filtersVisible = false"
    />
    <submission-dialog :is-active="dialogActive" :item="selectedItem" @close="dialogActive = false" />
  </div>
</template>

<script>
import { map, omit } from 'lodash';
import dayjs from 'dayjs';
import VueCsvDownloader from 'vue-csv-downloader';

// eslint-disable-next-line import/no-unresolved
import WhpptTable from '@whppt/nuxt/lib/components/ui/components/Table.vue';
// eslint-disable-next-line import/no-unresolved
import WhpptButton from '@whppt/nuxt/lib/components/ui/components/Button.vue';
// eslint-disable-next-line import/no-unresolved
import WhpptCheckbox from '@whppt/nuxt/lib/components/ui/components/Checkbox.vue';
import SubmissionDialog from './SubmissionDialog.vue';
import SubmissionsFilters from './SubmissionsFilters.vue';

export default {
  name: 'FormSubmissions',
  components: {
    VueCsvDownloader,
    WhpptTable,
    WhpptButton,
    WhpptCheckbox,
    SubmissionDialog,
    SubmissionsFilters,
  },
  data: () => ({
    filtersVisible: false,
    formSubmissions: undefined,
    currentPage: 1,
    limit: 10,
    total: 0,
    filters: {
      identifier: '',
      fromDate: undefined,
      toDate: undefined,
    },
    headers: [
      { text: 'Form Identifier', align: 'start', value: 'Form Identifier' },
      { text: 'Email Subject', align: 'start', value: 'Email Subject' },
      { text: 'Email Recipient', align: 'start', value: 'Email Recipient' },
      { text: 'Email ccs', align: 'start', value: 'Email ccs' },
      { text: 'Submitted At', align: 'start', value: 'Submitted At' },
      { text: '', align: 'start', value: 'viewSubmission' },
    ],
    dialogActive: false,
    selectedItem: undefined,
    allSubmissions: [],
    showDraftSubmissions: false,
  }),
  computed: {
    items() {
      if (!this.formSubmissions) return [];

      return map(this.formSubmissions, formSubmission => ({
        'Email Subject': formSubmission.settings.subject || '',
        'Form Identifier': formSubmission.settings.identifier || '',
        'Email Recipient': formSubmission.settings.recipient || '',
        'Email ccs':
          formSubmission.settings.ccs && formSubmission.settings.ccs.length
            ? formSubmission.settings.ccs.join(', ')
            : '',
        'Submitted At': dayjs(formSubmission.createdAt).format('h:mm a, DD/MM/YYYY') || '',
        formFields: formSubmission.form,
      }));
    },
    csvSubmissions() {
      if (!this.allSubmissions) return [];
      return map(this.allSubmissions, submission => ({
        'Form Identifier': submission.settings.identifier || '',
        'Email Subject': submission.settings.subject || '',
        'Email Recipient': submission.settings.recipient || '',
        'Email ccs':
          submission.settings.ccs && submission.settings.ccs.length ? submission.settings.ccs.join(', ') : '',
        'Submitted At': dayjs(submission.createdAt).format('h:mm a, DD/MM/YYYY') || '',
        ...submission.form,
      }));
    },
  },
  created() {
    this.fetchFormData();
  },
  methods: {
    fetchFormData(resetPage) {
      if (resetPage) this.page = 1;

      const params = {
        ...this.filters,
        showDraftSubmissions: this.showDraftSubmissions || undefined,
        limit: this.limit,
        page: this.currentPage,
      };

      return this.$axios
        .$get(`/api/forms/getSubmissions`, {
          params,
        })
        .then(({ formSubmissions, total, allSubmissions }) => {
          this.formSubmissions = formSubmissions;
          this.total = total;
          this.allSubmissions = allSubmissions;
        });
    },
    viewFormInput(item) {
      this.selectedItem = {
        ...omit(item, ['formFields']),
        ...item.formFields,
      };
      this.dialogActive = true;
    },
    updateFilter({ field, value }) {
      this.filters[field] = value;
      this.fetchFormData(true);
    },
    clearFilters() {
      this.filters = { identifier: '', fromDate: undefined, toDate: undefined };
      this.fetchFormData(true);
    },
    exportToCSV() {
      return this.$axios.$get(`/api/forms/generateCSV`, this.filters).then(csv => {});
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-600: #5a67d8;

.whppt-filters-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 3rem;
  margin-bottom: 0.5rem;
}
.whppt-filters-button {
  margin-left: auto;
  margin-bottom: 0.5rem;
}

.whppt-dashboard__wrapper {
  display: flex;
}

.whppt-dashboard__form {
  padding: 1rem;
  width: 100%;
}

.whppt-form__input {
  display: flex;

  svg {
    margin-right: 0.5rem;
  }

  &:hover,
  &:focus {
    color: $primary-600;
    text-decoration: underline;
  }
}
</style>
