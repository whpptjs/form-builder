<template>
  <div>
    <% if (options.siteKey) { %>
    <vue-recaptcha site-key="<%= options.siteKey %>"></vue-recaptcha>
    <% } %>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'Recaptcha',
  components: { VueRecaptcha },
};
</script>

<style scoped></style>
