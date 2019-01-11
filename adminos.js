import 'jquery';
import $ from 'jquery';
window.$ = window.jQuery = $;

import {} from 'jquery-ujs';
import 'jquery-autosize';

import 'jquery-ui/ui/widgets/sortable';
import 'nestedSortable';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min';

import 'spin/dist/spin.min';
import 'select2/dist/js/select2.min';
import 'select2/dist/js/i18n/ru';

import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min';
import 'bootstrap/dist/js/bootstrap.min';

import "optiscroll"
import "optiscroll/dist/jquery.optiscroll.min"

if (process.env.NODE_ENV === 'production') {
  require('./dist/js/adminos.min');
} else {
  require('./dist/js/adminos');
}