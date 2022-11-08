import defer from './defer';

var ownProp = Object.prototype.hasOwnProperty;
var deferred = defer();
// var resolveScriptLoad;
// var scriptLoadPromise = new Promise(resolve => {
//   console.log('🚀 ~ file: recaptcha.js ~ line 7 ~ scriptLoadPromise ~ resolve', resolve);
//   resolveScriptLoad = () => {
//     console.log('🚀 ~ file: recaptcha.js ~ line 10 ~ scriptLoadPromise ~ resolve');
//     resolve();
//   };
// }).then(() => console.log('🚀 testing'));

const recaptchaManager = {
  notify: function notify() {
    console.log('🚀 ~ file: recaptcha.js ~ line 8 ~ notify ~ notify');
    deferred.resolve();
    // resolveScriptLoad();
  },
  wait: function wait() {
    return deferred.promise;
    // return scriptLoadPromise;
  },
  render: function render(ele, options, cb) {
    console.log('🚀 ~ file: recaptcha.js ~ line 6 ~ createRecaptcha ~ deferred', deferred, this.wait());
    this.wait().then(() => {
      console.log('🚀 ~ file: recaptcha.js ~ line 14 ~ render ~ options', options);
      cb(window.grecaptcha.render(ele, options));
    });
    // .catch(err => console.log(err));
  },
  reset: function reset(widgetId) {
    if (typeof widgetId === 'undefined') {
      return;
    }

    this.assertLoaded();
    this.wait().then(function () {
      return window.grecaptcha.reset(widgetId);
    });
  },
  execute: function execute(widgetId) {
    if (typeof widgetId === 'undefined') {
      return;
    }

    this.assertLoaded();
    this.wait().then(function () {
      return window.grecaptcha.execute(widgetId);
    });
  },
  checkRecaptchaLoad: function checkRecaptchaLoad() {
    if (ownProp.call(window, 'grecaptcha') && ownProp.call(window.grecaptcha, 'render')) {
      this.notify();
    }
  },
  // assertLoaded: function assertLoaded() {
  //   if (!deferred.resolved()) {
  //     throw new Error('ReCAPTCHA has not been loaded');
  //   }
  // },
  loadScript() {
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      window.recaptchaApiLoaded = () => this.notify();

      const scriptId = '__RECAPTCHA_SCRIPT';
      const recaptchaHost = 'www.google.com';
      const language = '';
      if (!document.getElementById(scriptId)) {
        var script = document.createElement('script');
        script.id = scriptId;
        script.src =
          'https://' + recaptchaHost + '/recaptcha/api.js?onload=recaptchaApiLoaded&render=explicit&hl=' + language;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }
  },
};

export { recaptchaManager };
