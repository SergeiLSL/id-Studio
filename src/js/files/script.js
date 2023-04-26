// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

"use strict"

function imagesInit() {
   const images = document.querySelectorAll('.article__image');
   if (images.length) {
      images.forEach(image => {
         const imageItem = image.querySelector('img');
         const padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
         image.style.paddingBottom = `${padding}%`;
         imageItem.classList.add('init');
      });
   }
}

// расстановка картинок по гридам
function gridInit() {
   const items = document.querySelector('.portfolio__items');
   const itemsGrid = new Isotope(items, {
      itemSelector: '.article',
      masonry: {
         fitWidth: true,
         gutter: 20
      }
   });

   // включение фильтра
   document.addEventListener('click', documentActions);

   function documentActions(e) {
      const targetElement = e.target;
      if (targetElement.closest('.filter-portfolio__item')) {
         const filterItem = targetElement.closest('.filter-portfolio__item');
         const filterValue = filterItem.dataset.filter;
         const filterActiveItem = document.querySelector('.filter-portfolio__item.active');

         filterValue === "*" ? itemsGrid.arrange({ filter: `` }) :
            itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` })

         filterActiveItem.classList.remove('active');
         filterItem.classList.add('active');

         e.preventDefault();
      }
   }

}

window.addEventListener('load', windowLoad);

function windowLoad() {
   imagesInit();
   gridInit();
}