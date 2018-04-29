/* eslint-env browser */
/* global angular */

class WidgetService {
  getAll() {
    return JSON.parse(localStorage.getItem('widgetsConfig'));
  }

  getByName(name) {
    return this.getAll()[name];
  }

  upsertBulk(widgets) {
    const data = JSON.stringify(widgets);
    localStorage.setItem('widgetsConfig', data);
  }
}

export default angular.module('services.widget', [])
  .service('widgetService', WidgetService)
  .name;
