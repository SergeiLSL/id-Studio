// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// "use strict"

// function imagesInit() {
//    const images = document.querySelectorAll('.article__image');
//    if (images.length) {
//       images.forEach(image => {
//          const imageItem = image.querySelector('img');
//          const padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
//          image.style.paddingBottom = `${padding}%`;
//          imageItem.classList.add('init');
//       });
//    }
// }

// // расстановка картинок по гридам
// function gridInit() {
//    const items = document.querySelector('.portfolio__items');
//    const itemsGrid = new Isotope(items, {
//       itemSelector: '.article',
//       masonry: {
//          fitWidth: true,
//          gutter: 20
//       }
//    });

//    // включение фильтра
//    document.addEventListener('click', documentActions);

//    function documentActions(e) {
//       const targetElement = e.target;
//       if (targetElement.closest('.filter-portfolio__item')) {
//          const filterItem = targetElement.closest('.filter-portfolio__item');
//          const filterValue = filterItem.dataset.filter;
//          const filterActiveItem = document.querySelector('.filter-portfolio__item.active');

//          filterValue === "*" ? itemsGrid.arrange({ filter: `` }) :
//             itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` })

//          filterActiveItem.classList.remove('active');
//          filterItem.classList.add('active');

//          e.preventDefault();
//       }
//    }

// }

// window.addEventListener('load', windowLoad);

// function windowLoad() {
//    imagesInit();
//    gridInit();
// }

/*+++++++++++++++++++++++++++++ */
window.addEventListener('load', windowLoad);

function windowLoad() {
   document.addEventListener('click', documentActions);
}

function documentActions(e) {
   const targetElement = e.target;
   // console.log(targetElement.classList)

   // Scroll to
   if (targetElement.hasAttribute('data-goto')) {
      const gotoElement = document.querySelector(`${targetElement.dataset.goto}`);
      const headerHeight = document.querySelector(`.header`).offsetHeight;

      if (gotoElement) {
         window.scrollTo({
            top: gotoElement.offsetTop - headerHeight,
            behavior: "smooth"
         });
      }

      e.preventDefault();
   }

   // portfolio filter
   if (targetElement.classList.contains('items-portfolio__type') && !targetElement.classList.contains('active')) {
      const activeElement = document.querySelector(`.items-portfolio__type.active`);
      const elements = document.querySelectorAll(`.items-portfolio__item`);
      const elementType = targetElement.dataset.workType;

      activeElement.classList.remove('active');
      targetElement.classList.add('active');

      elements.forEach(element => {
         !elementType || element.dataset.workType === elementType ?
            element.hidden = false : element.hidden = true;
      });
   }
}

//========================================================================================================================================================
// Добавляем код для открытия/закрытия меню через бургер ИЛИ ЧИТАЕМ ЧЕРТОГИ

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock'); // добавляем класс замок - запрещаем прокручиваться странице при открытом меню
		// для решения обращаемся к body и добавляем "overflow: hidden;"
      iconMenu.classList.toggle('_active'); // при обращении к бургеру добавляем класс _active
      menuBody.classList.toggle('_active'); // при обращении к бургеру добавляем класс _active
   });
}

//============================================================
//============================================================
// Прокрутка при открытом меню бургера
// Прокрутка при клике time
//Соберем в константу все ссылки у которых есть атрибут data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// Проверим наличие таких ссылок
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {//необходимо получить объект на который мы кликаем
      const menuLink = e.target;
      //console.log(menuLink);
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         // надо учесть высоту шапки, чтобы доезд объекта был точным
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

         // ЧТОБЫ При обращении к пункту меню убиралось и страница прокручивалась к нужному пункту 
         if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock'); // разрешаем прокручиваться странице 
            iconMenu.classList.remove('_active');// при обращении к бургеру убираем класс _active
            menuBody.classList.remove('_active');
         } // при обращении к бургеру убираем класс _active


         // Этот кусочек кода и заставит прокрутиться страницы к нужному месту
         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         // После выполнения прокрутки отключаем ссылку
         e.preventDefault();
      }
   }
}
//=======================================================================================================================================================
// ? Анимация при скролле
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) { // ищем все объекты
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index]; // получаем переменную для каждого элемента массива
			const animItemHeight = animItem.offsetHeight; // получаем высоту объекта 
			const animItemOffset = offset(animItem).top; // получаем позицию объекта относительно верха через фуекцию offset(el)
			const animStart = 8; // коэф-т момента старта анимации

			let animItemPoint = window.innerHeight - animItemHeight / animStart; // от высоты окна браузера - отнимаем высоту объекта поделенную на animStart
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
            // чтобы не было анимации приобратном скролле
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) { // получаем позицию объекта относительно верха
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 200);
}