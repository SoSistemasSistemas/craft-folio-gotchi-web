export default function httpInterceptor($q, alertService) {
  const request = req => req;

  const handleError = (rejection) => {
    const deferred = $q.defer();

    const { data } = rejection;
    const title = 'Ops... Algo de errado aconteceu!';
    const message = data && data.error || data;

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
