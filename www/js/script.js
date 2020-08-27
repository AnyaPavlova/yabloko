"use strict";

$(document).ready(function () {
  // Календарь
  var hasCalendar = document.querySelector('.calendar');

  if (hasCalendar) {
    $.datepicker.regional['ru'] = {
      closeText: 'Закрыть',
      prevText: 'Предыдущий',
      nextText: 'Следующий',
      currentText: 'Сегодня',
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
      dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      weekHeader: 'Не',
      dateFormat: 'dd.mm.yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    var currentDate = 0; //переменная для хранения выбранной даты

    var currentDays = ["2020-8-21", "2020-8-24", "2020-8-27", "2020-8-7", "2020-8-11", "2020-8-28", "2020-8-1", "2020-7-30", "2020-9-5"]; //массив "активных" дат

    var datepicker = $("#datepicker").datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      // minDate: 0,
      onSelect: function onSelect(date) {
        //при изменении даты
        $('#datepicker_value').val(date);
        currentDate = date;
        console.log(currentDate);
      },
      beforeShowDay: function beforeShowDay(date) {
        var m = date.getMonth();
        var d = date.getDate();
        var y = date.getFullYear();
        var today, yesterday;
        today = new Date();
        yesterday = new Date(today.setUTCDate(today.getUTCDate() - 1));

        for (var i = 0; i < currentDays.length; i++) {
          if ($.inArray(y + '-' + (m + 1) + '-' + d, currentDays) !== -1) {
            if (date < yesterday) {
              return [true, 'calendar-before calendar-active', ''];
            } else {
              return [true, 'calendar-active', ''];
            }
          } else {
            if (date < yesterday) {
              return [true, 'calendar-before', '']; // return [false, 'calendar-before', ''];
            } else {// return [false, "", ""];
              }
          }
        }

        return [true];
      }
    });
    currentDate = datepicker[0].value;
    console.log(currentDate);
  } // Табы  


  var tabsBlockArr = document.querySelectorAll('.tabs');

  if (tabsBlockArr.length !== 0) {
    var changeActiveTab = function changeActiveTab(event) {
      var eventTarget = event.target;

      if (eventTarget.classList.contains('tabs__nav-item')) {
        this.querySelector('.tabs__nav-item--active').classList.remove('tabs__nav-item--active');
        eventTarget.classList.add('tabs__nav-item--active');
        var dataBlock = eventTarget.dataset.section;
        this.querySelector('.tabs__item--active').classList.remove('tabs__item--active');
        this.querySelector(".tabs__item[data-name-section=".concat(dataBlock, "]")).classList.add('tabs__item--active');
      }
    };

    for (var i = 0; i < tabsBlockArr.length; i++) {
      tabsBlockArr[i].addEventListener('click', changeActiveTab);
    }
  } //Переход по ссылке-анкору


  $('.link-anchor').on("click", function (e) {
    e.preventDefault();
    var mylink = $(this).attr('href');
    var positionblock = $(mylink).offset().top;
    $('html, body').animate({
      scrollTop: positionblock
    }, 1100);
  }); //Полоса % сбора

  var paymentProgressLine = document.querySelector('#payment-progress-line');

  if (paymentProgressLine) {
    var paymentStart = document.querySelector('#payment-start').innerText.replace(/[^0-9.]/gim, "");
    var paymentAll = document.querySelector('#payment-all').innerText.replace(/[^0-9.]/gim, "");
    var percent = 100 - (paymentStart * 100 / paymentAll).toFixed(2);
    paymentProgressLine.querySelector('span').style.width = "".concat(percent, "%");
  } //Добавление соц. сети по кнопке


  var addSocialNetworkBtn = document.querySelector('#add-social-network');

  if (addSocialNetworkBtn) {
    var addSocialNetwork = function addSocialNetwork(event) {
      event.preventDefault();
      var parentBtnAdd = addSocialNetworkBtn.closest('.col');
      var newItemSocialBlock = "<div class=\"col col-4 join-form__item\"><input type=\"text\" name=\"social-network[]\" class=\"join-form__input\"></div>";
      parentBtnAdd.insertAdjacentHTML('beforebegin', newItemSocialBlock);
    };

    addSocialNetworkBtn.addEventListener('click', addSocialNetwork);
  } //Form


  var formInPage = document.querySelectorAll('form');

  if (formInPage.length !== 0) {
    for (var formItem = 0; formItem < formInPage.length; formItem++) {
      formInPage[formItem].addEventListener('submit', validateForm);
    }
  }

  function validateForm(event) {
    var form = event.target;
    var error = validateFields(form); //запускаем проверку полей в этой форме

    if (error === true) {
      /*если есть ошибка*/
      event.preventDefault();
      form.querySelector('.form__message').classList.add('form__message--error');
      form.querySelector('.form__message').innerText = "Ошибки заполнения. Пожалуйста, проверьте все поля и отправьте снова.";
    } else {
      /*если нет ошибки - отправляем форму*/
      event.preventDefault();
      form.querySelector('.form__message').classList.remove('form__message--error');
      form.querySelector('.form__message').classList.add('form__message--ok');
      form.querySelector('.form__message').innerHTML = "Ваша заявка принята. <br> Мы свяжемся с вами в ближайшее время";
      sendAjaxForm(form); //отправка формы

      resetForm(form); //очищаем форму
    }
  }

  function validateFields(form) {
    var error = false;
    var requredItems = form.querySelectorAll('input[required]');

    for (var item = 0; item < requredItems.length; item++) {
      if (!requredItems[item].checkValidity()) {
        requredItems[item].classList.add('form__input--error');
        error = true;
      }

      requredItems[item].addEventListener('input', changeFields); //подписываем на событие input на поле

      requredItems[item].addEventListener('change', changeFields); //для checkbox/radio
    }

    return error;
  }

  function changeFields(event) {
    var eventTarget = event.target;

    if (eventTarget.checkValidity()) {
      eventTarget.classList.remove("form__input--error");

      if (eventTarget.closest('form').querySelector('.form__message').classList.contains('form__message--error')) {
        var error = validateFields(eventTarget.closest('form'));

        if (error === false) {
          eventTarget.closest('form').querySelector('.form__message').classList.remove('form__message--error');
        }
      }
    } else {// eventTarget.classList.add("form__input--error");   
    }
  }

  function resetForm(form) {
    $(form).trigger('reset');
    setTimeout(function () {
      form.querySelector('.form__message').classList.remove('form__message--ok');
    }, 5000);
  }

  function sendAjaxForm(dataForm) {
    $.ajax({
      url: dataForm.action,
      //url страницы jquery-mailer.php
      type: "POST",
      //метод отправки
      data: $(dataForm).serialize(),
      // Сеарилизуем объект
      success: function success(response) {
        //Данные отправлены успешно
        console.log('ok');
      },
      error: function error(response) {
        // Данные не отправлены          
        console.log('error');
      }
    });
  }

  ; //Кнопка Копирования

  var copyBlock = document.querySelector('.copy-in-buffer');

  if (copyBlock) {
    var copyInfoInBuffer = function copyInfoInBuffer(event) {
      var textCopy = copyBlock.querySelector('.copy-in-buffer__text').innerText;
      textCopy = "<input type=\"text\" value=\"".concat(textCopy, "\" class=\"copy-in-buffer__select-text\">");
      copyBlock.insertAdjacentHTML('afterbegin', textCopy);
      document.querySelector('.copy-in-buffer__select-text').select();
      document.execCommand("copy");
      var item = copyBlock.querySelector('.copy-in-buffer__select-text');
      item.parentNode.removeChild(item);
    };

    copyBlock.querySelector('.copy-in-buffer__btn').addEventListener('click', copyInfoInBuffer);
  } //Форма ПОДДЕРЖАТЬ на главной - создаем сообщение


  var supportForm = document.querySelector('.support-form');

  if (supportForm) {
    var supportFormInputArr;
    var i;
    var textBlock;

    (function () {
      //наша валидация
      var checkSupportInput = function checkSupportInput(event) {
        var eventTarget = event.target;
        var regexpNumbers = new RegExp(/[^\d]/);

        if (eventTarget.name === 'passport-serial' || eventTarget.name === 'passport-number') {
          eventTarget.value = eventTarget.value.replace(regexpNumbers, '');
        }

        var regexpPhone = new RegExp(/[^\d\-\+\ ]/);

        if (eventTarget.name === 'phone') {
          eventTarget.value = eventTarget.value.replace(regexpPhone, '');
        }

        var regexpDate = new RegExp(/^[0-9]$|^[0-2][0-9]$|^3[0-1]$/);

        if (eventTarget.name === 'dob-day') {
          var testReg = regexpDate.test(eventTarget.value);

          if (!testReg) {
            eventTarget.setCustomValidity('error'); //пользовательская ошибка!

            eventTarget.classList.add("form__input--error");
          } else {
            eventTarget.setCustomValidity('');
            eventTarget.classList.remove("form__input--error");
          }
        }

        var regexMonth = new RegExp(/^0[1-9]$|^1[0-2]$|^января$|^февраля$|^марта$|^апреля$|^мая$|^июня$|^июля$|^августа$|^сентября$|^октября$|^ноября$|^декабря$/i);

        if (eventTarget.name === 'dob-month') {
          var testReg = regexMonth.test(eventTarget.value.trim());

          if (!testReg && eventTarget.value.length > 1) {
            eventTarget.setCustomValidity('error'); //пользовательская ошибка!

            eventTarget.classList.add("form__input--error");
          } else {
            eventTarget.setCustomValidity('');
            eventTarget.classList.remove("form__input--error");
          }
        }

        if (eventTarget.name === 'dob-year') {
          eventTarget.value = eventTarget.value.replace(regexpNumbers, '');

          if (eventTarget.value.length === 4) {
            var currentYear = new Date().getFullYear();

            if (currentYear - eventTarget.value < 18 || currentYear - eventTarget.value > 100) {
              eventTarget.setCustomValidity('error'); //пользовательская ошибка!

              eventTarget.classList.add("form__input--error");
            } else {
              eventTarget.setCustomValidity('');
              eventTarget.classList.remove("form__input--error");
            }
          } else {
            eventTarget.setCustomValidity('error'); //пользовательская ошибка!

            eventTarget.classList.add("form__input--error");
          }
        }

        var regexPay = new RegExp(/[^\d\₽\ ]/);

        if (eventTarget.name === 'pay') {
          eventTarget.value = eventTarget.value.replace(regexPay, '');
          eventTarget.value = eventTarget.value.replace(' ₽', '');

          if (eventTarget.value) {
            eventTarget.value = eventTarget.value + ' ₽';
            eventTarget.setSelectionRange(eventTarget.value.length - 2, eventTarget.value.length - 2);
          }
        }
      }; //Создаем сообщение


      var fillingTextBlock = function fillingTextBlock(event) {
        var name = '';

        if (supportForm.querySelector('input[name=secondname]').value || supportForm.querySelector('input[name=name]').value || supportForm.querySelector('input[name=patronymic]').value) {
          name = "".concat(supportForm.querySelector('input[name=secondname]').value, " ").concat(supportForm.querySelector('input[name=name]').value, " ").concat(supportForm.querySelector('input[name=patronymic]').value, ", ");
        }

        var dopMonth;

        if (supportForm.querySelector('input[name=dob-month]').value) {
          var month = function month() {
            switch (dopMonth) {
              case 'января':
                return '01';

              case 'февраля':
                return '02';

              case 'марта':
                return '03';

              case 'апреля':
                return '04';

              case 'мая':
                return '05';

              case 'июня':
                return '06';

              case 'июля':
                return '07';

              case 'августа':
                return '08';

              case 'сентября':
                return '09';

              case 'октября':
                return '10';

              case 'ноября':
                return '11';

              case 'декабря':
                return '12';

              default:
                return dopMonth;
            }
          };

          dopMonth = supportForm.querySelector('input[name=dob-month]').value.trim().toLowerCase();
          dopMonth = month();
        }

        var date = '';

        if (supportForm.querySelector('input[name=dob-day]').value && dopMonth && supportForm.querySelector('input[name=dob-year]').value) {
          date = "\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F ".concat(supportForm.querySelector('input[name=dob-day]').value, ".").concat(dopMonth, ".").concat(supportForm.querySelector('input[name=dob-year]').value, ",");
        }

        var adress = "".concat(supportForm.querySelector('input[name=subject]').value, " ").concat(supportForm.querySelector('input[name=city]').value);

        if (supportForm.querySelector('input[name=address-street]').value) {
          adress = adress + ", ".concat(supportForm.querySelector('input[name=address-street]').value);
        }

        if (supportForm.querySelector('input[name=address-house]').value) {
          adress = adress + " \u0434.".concat(supportForm.querySelector('input[name=address-house]').value);
        }

        if (supportForm.querySelector('input[name=address-building]').value) {
          adress = adress + " \u043A.".concat(supportForm.querySelector('input[name=address-building]').value);
        }

        if (supportForm.querySelector('input[name=address-apartment]').value) {
          adress = adress + " \u043A\u0432.".concat(supportForm.querySelector('input[name=address-apartment]').value, ",");
        }

        var pasport = '';

        if (supportForm.querySelector('input[name=passport-serial]').value && supportForm.querySelector('input[name=passport-number]').value) {
          pasport = "\u043F\u0430\u0441\u043F.".concat(supportForm.querySelector('input[name=passport-serial]').value, " ").concat(supportForm.querySelector('input[name=passport-number]').value, ", \u0433\u0440.\u0420\u0424");
        }

        var newText = "\u041F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u043D\u0438\u0435. ".concat(name, " ").concat(date, " ").concat(adress, " ").concat(pasport);
        textBlock.innerText = newText;
      };

      //отслеживаем input
      supportFormInputArr = document.querySelectorAll('.support-form__input');

      for (i = 0; i < supportFormInputArr.length; i++) {
        supportFormInputArr[i].addEventListener('input', function () {
          fillingTextBlock();
          checkSupportInput(event);
        });
      }

      textBlock = document.querySelector('.copy-in-buffer__text');
    })();
  }
});
/*Полифилы для ie*/

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}