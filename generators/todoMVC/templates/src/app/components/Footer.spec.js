require('zone.js');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var FooterComponent = require('./Footer');
var ngTest = require('@angular/core/testing');
var filters = require('../constants/TodoFilters');

describe('components', function () {
  var tcb;

  beforeEach(ngTest.inject([ngTest.TestComponentBuilder], function (_tcb) {
    tcb = _tcb;
  }));

  describe('Footer', function () {
    it('should render \'Test\'', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(FooterComponent)
        .then(function (fixture) {
          fixture.detectChanges();
          var footer = fixture.nativeElement;
          expect(footer.querySelector('footer')).not.toBeNull();
          expect(footer.querySelector('footer').className).toBe('footer');
        });
    })));

    it('should display active count when 0', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(FooterComponent)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          FooterCmp.activeCount = 0;
          fixture.detectChanges();
          expect(footer.querySelector('.todo-count').textContent.trim()).toBe('No items left');
        });
    })));

    it('should display active count when above 0', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(FooterComponent)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          FooterCmp.activeCount = 1;
          fixture.detectChanges();
          expect(footer.querySelector('.todo-count').textContent.trim()).toBe('1 item left');
        });
    })));

    it('should call onShow when a filter is clicked', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(FooterComponent)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          fixture.detectChanges();
          spyOn(FooterCmp.onShow, 'emit');
          footer.querySelectorAll('a')[1].dispatchEvent(new Event('click'));
          expect(FooterCmp.onShow.emit).toHaveBeenCalledWith(filters.SHOW_ACTIVE);
        });
    })));

    it('shouldnt show clear button when no completed todos', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(FooterComponent)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          FooterCmp.completedCount = 0;
          fixture.detectChanges();
          expect(footer.querySelector('.clear-completed')).toBeNull();
        });
    })));

    it('should call onClearCompleted on clear button click', ngTest.async(ngTest.inject([], function () {
      tcb.createAsync(FooterComponent)
        .then(function (fixture) {
          var footer = fixture.nativeElement;
          var FooterCmp = fixture.componentInstance;
          FooterCmp.completedCount = 1;
          fixture.detectChanges();
          spyOn(FooterCmp.onClearCompleted, 'emit');
          footer.querySelector('.clear-completed').dispatchEvent(new Event('click'));
          expect(FooterCmp.onClearCompleted.emit).toHaveBeenCalled();
        });
    })));
  });
});
