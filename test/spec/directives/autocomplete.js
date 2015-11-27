describe('Testing autotype directive', function() {
  var $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('myApp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  it('Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile('<div auto-type placeholder="Search for country" searchfield="name" name="name" data="data" limit="5"></div>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("placeholder");
  });
  //Check placeholder is  correctly
  it('should render placeholder string correctly', function() {
      var element = angular.element('<div auto-type placeholder="Search for country" searchfield="name" name="name" data="data" limit="5"></div>');
      $scope.selectedCountry = null;
      $compile(element)($scope);
      $scope.$digest();
      expect(element.find('input').attr('placeholder')).toEqual('Search for country');
    });
 it('should render dropdown with correct number of elements', function() {
   var element = angular.element('<div auto-type placeholder="Search for country" searchfield="name" name="name" data="countries" limit="5"></div>');
   $scope.countries = ['Afghanistan','tanzania','pakistan','bhutan', 'kazakstan'];
      $compile(element)($scope);
      $scope.$digest();
      var inputField = element.find('input');
      var e = $.Event('keyup');
      e.which = 65; // letter: a
      inputField.val('a');
      inputField.trigger('input');
      inputField.trigger(e);
      expect(element.find('li').length).toBe(5);
  });
  it('should append only 2 elements', function() {
   var element = angular.element('<div auto-type placeholder="Search for country" searchfield="name" name="name" data="countries" limit="5"></div>');
   $scope.countries = ['Afghanistan','tanzania','pakistan','bhutan', 'kazakstan'];
      $compile(element)($scope);
      $scope.$digest();
      var inputField = element.find('input');
      var e = $.Event('keyup');
      e.which = 65; // letter: a
      inputField.val('ia');
      inputField.trigger('input');
      inputField.trigger(e);
      expect(element.find('li').length).toBe(1);
  });
   it('should return an empty array when keydown and value is empty ', function() {
   var element = angular.element('<div auto-type placeholder="Search for country" searchfield="name" name="name" data="countries" limit="5"></div>');
   $scope.countries = ['Afghanistan','tanzania','pakistan','bhutan', 'kazakstan'];
      $compile(element)($scope);
      $scope.$digest();
      var inputField = element.find('input');
      var e = $.Event('keyup');
      e.which = 8; // Backspace
      inputField.val('');
      inputField.trigger('input');
      inputField.trigger(e);
      expect(element.find('li').length).toBe(0);
  });
   it('should select the second value in the array on keydown ', function() {
   var element = angular.element('<div auto-type placeholder="Search for country" searchfield="name" name="name" data="countries" limit="5"></div>');
   $scope.countries = ['Afghanistan','tanzania','pakistan','bhutan', 'kazakstan'];
      $compile(element)($scope);
      $scope.$digest();
      var inputField = element.find('input');
      var e = $.Event('keyup');
      e.which = 65; // letter: a
      inputField.val('a');
      inputField.trigger('input');
      inputField.trigger(e);
      var e = $.Event("keyup", { which: 40}); //"keydown" if that's what you're doing
      inputField.trigger(e);
      var scope = element.isolateScope();
 
      expect(scope.currentIndex).toBe(1);
  });
});