const header = document.querySelector('.header-wrapper');
const headerHome = document.querySelector('.index .header-wrapper');
const announcementBar = document.querySelector('#shopify-section-announcement-bar');
console.log(header);
console.log(headerHome);
if (headerHome !== null) {
  window.onscroll = () => {
      if (window.scrollY > 120) {
        if (header.classList.contains('header-position-static')){
            header.classList.remove('header-position-static')
            header.classList.add('header-position-fixed')
        }
      } else {
        if (header.classList.contains('header-position-fixed')){
           header.classList.add('header-position-static')
           header.classList.remove('header-position-fixed') 
        }

      }
  };
} else {
  if (header.classList.contains('header-position-static')) {
    header.classList.remove('header-position-static');
    header.classList.add('header-position-fixed');
  }
}

const drawerIcon = document.querySelector('header-drawer');
const menuDrawerContainer = document.querySelector('.header__icon--menu');
console.log(menuDrawerContainer);
menuDrawerContainer.addEventListener("touchStart", () => {
   header.classList.add('.drawer-open');
});


drawerIcon.addEventListener("touchEnd", () => {
   header.classList.remove('.drawer-open');
});

const searchBtn = document.querySelector('details-modal>details');
const mainContent = document.querySelector('#MainContent');
const searchModal = document.querySelector('.search-modal');

searchBtn.parentElement.addEventListener("click", () => {
  announcementBar.style.zIndex = '9';
  if(window.scrollY > 250){
    header.style.marginTop = '-10.5rem';
    searchModal.style.borderBottom = '2px solid #f0bb5a';
  };
});

document.addEventListener('mouseup', function(e) {
    if (!header.firstChild.contains(e.target) && !announcementBar.contains(e.target)) {
      announcementBar.style.zIndex = '10';      
    };
});





// let searchBar = (function() {
//   const searchBtn = document.querySelector('details-modal>details');
//   const mainContent = document.querySelector('#MainContent');
//   const searchModal = document.querySelector('.search-modal');
//   function open(){
//     searchBtn.parentElement.addEventListener("click", () => {
//       announcementBar.style.zIndex = '9';

//       if(window.scrollY > 250){
//         header.style.marginTop = '-10.5rem';
//         searchModal.style.borderBottom = '2px solid #f0bb5a';
//       };

//       window.onscroll((e) => {
//         if(announcementBar.style.zIndex === '9'){
//           announcementBar.style.zIndex === '10';
//           header.style.marginTop = '-6.5rem';
//           searchModal.style.borderBottom = 'none';
//         }
//       })
      
//     });
//   }
//   return { open:open }
// }) ();