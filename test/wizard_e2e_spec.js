describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('/test/example.html');
  });

  describe('an active wizard', function() {
    describe('on the first step', function() {
      it('hides the second step by default', function() {
        expect( element('#step2').css('display') ).toEqual('none');
      });

      describe('navigation header', function() {
        it('renders all the steps in a cool header', function() {
          expect( repeater('#wizard1 .wizard_step').count() ).toEqual(2);
        });

        it('renders the label if a nav-label is not provided', function() {
          expect( element('#wizard1 .wizard_step:eq(0)').text() ).toEqual('Step 1');
        });

        it('sets the current step header class to selected', function() {
          expect( element('#wizard1 .wizard_step:eq(0)').prop('class') ).toMatch('selected');
        });

        it('renders the nav-label if it is specified', function() {
          expect( element('#wizard1 .wizard_step:eq(1)').text() ).toEqual('Step 2 Nav Label');
        });

        it('keeps all selected and completed off the pending steps', function() {
          expect( element('.wizard_step:eq(1)').prop('class') ).not().toMatch('selected');
          expect( element('.wizard_step:eq(1)').prop('class') ).not().toMatch('completed');
        });
      });

      describe('when clicking the proceed button on step 1', function() {
        beforeEach(function() {
          element('#step1 .next_button').click();
        });

        describe('nav header', function() {
          it('sets the previous step header class to completed', function() {
            expect( element('.wizard_step:eq(0)').prop('class') ).toMatch('completed');
          });

          it('sets the new current header class to completed', function() {
            expect( element('.wizard_step:eq(1)').prop('class') ).toMatch('selected');
          });
        });

        it('reveals the second step', function() {
          expect( element('#step2').css('display') ).toEqual('block');
        });

        it('adds completed class to the first step', function() {
          expect( element('#step1').prop('class') ).toMatch(' completed');
        });

        it('triggers the completed callback', function() {
          expect( element('#isCompleted').text() ).toEqual('true');
        });

        it('allows step content to access the outer scope', function() {
          var name = 'My Step 2 Name';
          input('someModel').enter(name);

          expect( element('#step2Content').text() ).toEqual(name);
        });
      });
    });
  });

  describe('an inactive wizard', function() {
    it('shows all steps by default', function() {
      expect( element('#wizard2step2').css('display') ).toEqual('block');
    });
  });
});
