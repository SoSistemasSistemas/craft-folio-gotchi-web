/* global swal */

import angular from 'angular';

import 'sweetalert';

class AlertService {
  constructor($q) {
    this.$q = $q;
  }

  show(opts) {
    const { title, message, icon } = opts;
    swal(title, message, icon || 'info');
  }

  error(opts) {
    const { title, message } = opts;
    this.show({ title, message, icon: 'error' });
  }

  success(opts) {
    const { title, message } = opts;
    this.show({ title, message, icon: 'success' });
  }

  warning(opts) {
    const { title, message } = opts;
    this.show({ title, message, icon: 'warning' });
  }

  confirm(opts) {
    const {
      title, message, dangerMode, icon, primaryButtonText, secondaryButtonText,
    } = opts;

    return this.$q((resolve, reject) => {
      swal(title, message, icon || 'warning', {
        dangerMode,
        buttons: {
          cancel: {
            text: secondaryButtonText,
            value: false,
            visible: true,
          },
          confirm: {
            text: primaryButtonText,
            value: true,
            visible: true,
          },
        },
      })
        .then((proceed) => {
          if (proceed) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }
}

export default angular.module('services.alert', [])
  .service('alertService', AlertService)
  .name;

AlertService.$inject = ['$q'];
