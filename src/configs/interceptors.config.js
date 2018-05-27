import httpInterceptor from '../interceptors/http.interceptor';

export default function interceptors($httpProvider) {
  $httpProvider.interceptors.push(httpInterceptor);
}

interceptors.$inject = ['$httpProvider'];
