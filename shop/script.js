
// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
// var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("header").style.top = "0";
//   } else {
//     document.getElementById("header").style.top = "-200px";
//   }
//   prevScrollpos = currentScrollPos;
// }


//mobMenu close-open
function openbox(underMenu){
    display = document.getElementById(underMenu).style.display;
    if(display=='none'){
          document.getElementById(underMenu).style.display='block';
    }else{
          document.getElementById(underMenu).style.display='none';
    }
}


function openbox(underList){
  display = document.getElementById(underList).style.display;
  if(display=='none'){
        document.getElementById(underList).style.display='block';
  }else{
        document.getElementById(underList).style.display='none';
  }
}


function openbox(underList2){
  display = document.getElementById(underList2).style.display;
  if(display=='none'){
        document.getElementById(underList2).style.display='block';
  }else{
        document.getElementById(underList2).style.display='none';
  }
}


function openbox(underList3){
  display = document.getElementById(underList3).style.display;
  if(display=='none'){
        document.getElementById(underList3).style.display='block';
  }else{
        document.getElementById(underList3).style.display='none';
  }
}


// function openbox(underList4){
//   display = document.getElementById(underList4).style.display;
//   if(display=='none'){
//         document.getElementById(underList4).style.display='block';
//   }else{
//         document.getElementById(underList4).style.display='none';
//   }
// }


// function openbox(underList5){
//   display = document.getElementById(underList4).style.display;
//   if(display=='none'){
//         document.getElementById(underList4).style.display='block';
//   }else{
//         document.getElementById(underList4).style.display='none';
//   }
// }

// let i = 1;
// for(let li of carousel.querySelectorAll('li')) {
//   li.style.position = 'relative';
//   li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
//   i++;
// }

/* конфигурация */
let width = 197; // ширина картинки
let count = 5; // видимое количество изображений

let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');

let position = 0; // положение ленты прокрутки

carousel.querySelector('.prev').onclick = function() {
  // сдвиг влево
  position += width * 1;
  // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
  position = Math.min(position, 0)
  list.style.marginLeft = position + 'px';
};

carousel.querySelector('.next').onclick = function() {
  // сдвиг вправо
  position -= width * 1;
  // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + 'px';
};





var multiItemSlider = (function () {
    return function (selector, config) {
      var
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
        _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
        _positionLeftItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсофрмации .slider_wrapper
        _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
        _items = []; // массив элементов

      // наполнение массива _items
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });

      var position = {
        getItemMin: function () {
          var indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position < _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getItemMax: function () {
          var indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position > _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getMin: function () {
          return _items[position.getItemMin()].position;
        },
        getMax: function () {
          return _items[position.getItemMax()].position;
        }
      }

      var _transformItem = function (direction) {
        var nextItem;
        if (direction === 'right') {
          _positionLeftItem++;
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
            nextItem = position.getItemMin();
            _items[nextItem].position = position.getMax() + 1;
            _items[nextItem].transform += _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform -= _step;
        }
        if (direction === 'left') {
          _positionLeftItem--;
          if (_positionLeftItem < position.getMin()) {
            nextItem = position.getItemMax();
            _items[nextItem].position = position.getMin() - 1;
            _items[nextItem].transform -= _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      // обработчик события click для кнопок "назад" и "вперед"
      var _controlClick = function (e) {
        if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
          var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
          _transformItem(direction);
        }
      };

      var _setUpListeners = function () {
        // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
        _sliderControls.forEach(function (item) {
          item.addEventListener('click', _controlClick);
        });
      }

      // инициализация
      _setUpListeners();

      return {
        right: function () { // метод right
          _transformItem('right');
        },
        left: function () { // метод left
          _transformItem('left');
        }
      }

    }
  }());

  var slider = multiItemSlider('.slider')
