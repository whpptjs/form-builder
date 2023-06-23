<template>
  <div class="recaptcha" :class="{ 'recaptcha--error': !!error }">
    <div ref="recaptchaDiv"></div>
  </div>
</template>

<script>
import { recaptchaManager } from './manager';

export default {
  name: 'RecaptchaControl',
  props: {
    error: { type: String, default: '' },
  },
  data() {
    return { widgetId: '' };
  },
  computed: {
    siteKey() {
      return this.$config.recaptcha_sitekey;
    },
  },
  mounted() {
    var opts = {
      sitekey: this.siteKey,
      callback: response => this.onVerify(response),
      'expired-callback': () => this.onExpired(),
      'error-callback': () => this.onError(),
    };
    const container = this.$refs.recaptchaDiv;
    recaptchaManager.render(container, opts, id => (this.widgetId = id));
    recaptchaManager.loadScript();
  },
  methods: {
    onVerify(response) {
      this.$emit('input', response);
    },
    onExpired() {
      this.$emit('input', '');
    },
    onError() {
      this.$emit('input', '');
      this.$emit('error');
    },
    reset() {
      if (!this.widgetId) return;
      recaptcha.reset(this.widgetId);
      this.$emit('input', '');
    },
  },
};
</script>
