describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('/test/example.html');
  });

  it('should display the home page', function() {
    expect(element('#step1').text()).toMatch('Step 2');
  });
});
