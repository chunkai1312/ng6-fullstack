/* @ngInject */
function ExceptionService($injector) {
  let $log;
  let toastr;

  return function (exception, cause) {
    $log = $log || $injector.get('$log');
    toastr = toastr || $injector.get('toastr');

    $log.error(exception);
    toastr.error(exception.message, exception.name);
  };
}

export default ExceptionService;
