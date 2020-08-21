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
            onSelect: function (date) { //при изменении даты
                $('#datepicker_value').val(date);
                currentDate = date;
                console.log(currentDate);
            },
            beforeShowDay: function (date) {
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
                            return [true, 'calendar-before', ''];
                            // return [false, 'calendar-before', ''];
                        }
                        else {
                            // return [false, "", ""];
                        }
                    }
                }
                return [true];
            }
        });
        currentDate = datepicker[0].value;
        console.log(currentDate);
    } 

    // Табы  
    var tabsBlockArr = document.querySelectorAll('.tabs');
    if(tabsBlockArr.length!==0) {
        for(var i=0; i < tabsBlockArr.length; i++) {
            tabsBlockArr[i].addEventListener('click', changeActiveTab);
        }
        function changeActiveTab(event) {
            var eventTarget = event.target;
            if(eventTarget.classList.contains('tabs__nav-item')) {
                this.querySelector('.tabs__nav-item--active').classList.remove('tabs__nav-item--active');
                eventTarget.classList.add('tabs__nav-item--active');

                var dataBlock = eventTarget.dataset.section;
                this.querySelector('.tabs__item--active').classList.remove('tabs__item--active');
                this.querySelector(`.tabs__item[data-name-section=${dataBlock}]`).classList.add('tabs__item--active');
            }
        }
    }


})

/*Полифилы для ie*/
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
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