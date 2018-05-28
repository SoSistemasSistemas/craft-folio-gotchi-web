/* globals localStorage */

export default function httpInterceptor($q, alertService) {
  const request = (req) => {
    const token = localStorage.getItem('cfg-auth-token');

    if (token) {
      req.headers['x-access-token'] = token;
    }

    return req;
  };

  const handleError = (rejection) => {
    const deferred = $q.defer();

    const { data } = rejection;
    const title = 'Ops... Algo de errado aconteceu!';
    const message = data && data.error || data || 'Favor entrar em contato com a equipe técnica.';

    alertService.error({ title, message });

    return deferred.promise;
  };

  const requestError = handleError;
  const responseError = handleError;

  return {
    request, requestError, responseError,
  };
}

httpInterceptor.$inject = ['$q', 'alertService'];
