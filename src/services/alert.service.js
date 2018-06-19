/* global swal */

import angular from 'angular';

import 'sweetalert';

class AlertService {
  constructor($q) {
    this.$q = $q;
  }

  show({ title, message, icon }) {
    swal(title, message, icon || 'info');
  }

  error({ title, message }) {
    this.show({ title, message, icon: 'error' });
  }

  success({ title, message }) {
    this.show({ title, message, icon: 'success' });
  }

  warning({ title, message }) {
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
