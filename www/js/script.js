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

  ;
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