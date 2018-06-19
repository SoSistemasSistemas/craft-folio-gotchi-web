/* globals localStorage */

import { UNAUTHORIZED } from 'http-status-codes';

export default function httpInterceptor($q, $state, alertService) {
  const request = (req) => {
    const token = localStorage.getItem('cfg-auth-token');

    if (token) {
      req.headers['x-access-token'] = token;
    }

    return req;
  };

  const handleError = (rejection) => {
    const deferred = $q.defer();

    const { data, status } = rejection;
    const title = 'Ops... Algo de errado aconteceu!';
    const message = data && data.error || data || 'Favor entrar em contato com a equipe técnica.';

    alertService.error({ title, message });

    if (status === UNAUTHORIZED) {
      $state.go('auth');
    }

    return deferred.promise;
  };

  const requestError = handleError;
  const responseError = handleError;

  return {
    request, requestError, responseError,
  };
}

httpInterceptor.$inject = ['$q', '$state', 'alertService'];
