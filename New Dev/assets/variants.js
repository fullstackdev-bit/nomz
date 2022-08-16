class VariantSelects extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('change', this.onVariantChange);
      this.onVariantChange();
    }
  
    onVariantChange() {
      this.updateOptions();
      this.updateMasterId();
      this.toggleAddButton(true, '', false);
      this.updatePickupAvailability();
  
      if (!this.currentVariant) {
        this.toggleAddButton(true, '', true);
        this.setUnavailable();
      } else {
        this.updateMedia();
        this.updateURL();
        this.updateVariantInput();
        this.renderProductInfo();
      }
    }
  
    updateOptions() {
      this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
    }
  
    updateMasterId() {
      this.currentVariant = this.getVariantData().find((variant) => {
        return !variant.options.map((option, index) => {
          return this.options[index] === option;
        }).includes(false);
      });
      
      this.cuurentMetafield = this.getVariantMetafields().find(meta => meta[this.currentVariant.id] !== undefined);
      this.variantMetafield = this.cuurentMetafield[this.currentVariant.id];
    }
  
    updateMedia() {
      if (!this.currentVariant || !this.currentVariant?.featured_media) return;
      const newMedia = document.querySelector(
        `[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
      );
      if (!newMedia) return;
      const parent = newMedia.parentElement;
      parent.prepend(newMedia);
      window.setTimeout(() => { parent.scroll(0, 0) });
    }
  
    updateURL() {
      if (!this.currentVariant) return;
      window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
    }
  
    updateVariantInput() {
      const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment`);
      productForms.forEach((productForm) => {
        const input = productForm.querySelector('input[name="id"]');
        input.value = this.currentVariant.id;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  
    updatePickupAvailability() {
      const pickUpAvailability = document.querySelector('pickup-availability');
      if (!pickUpAvailability) return;
  
      if (this.currentVariant?.available) {
        pickUpAvailability.fetchAvailability(this.currentVariant.id);	
      } else {
        document.querySelector('.pickup-card-wrapper').classList.remove('available');
        pickUpAvailability.removeAttribute('available');
        pickUpAvailability.innerHTML = '';
      }
    }
  
    renderProductInfo() {
      fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
        .then((response) => response.text())
        .then((responseText) => {
          const id = `price-${this.dataset.section}`;
          const html = new DOMParser().parseFromString(responseText, 'text/html')
          const destination = document.getElementById(id);
          const source = html.getElementById(id);
          if (source && destination) destination.innerHTML = source.innerHTML;
  
        document.getElementById(`price-${this.dataset.section}`)?.classList.remove('visibility-hidden');
        if(this.currentVariant.available){ 
          this.toggleAddButton(false, variantStrings.addToCart);
          document.getElementById('preorderbunner').innerHTML = '';
          document.getElementById('bc-order-id').innerHTML = '';
        } else { 
          this.toggleAddButton(true, variantStrings.soldOut);
          let htmlNew = `<div class="bc-order-wrapper sold-out-card">
                        <h3 class="title">Sold Out</h3>
                        <p class="message">Sorry, ${this.currentVariant?.name.replace(this.currentVariant?.title, '')} is sold out in size ${this.currentVariant?.title}.</p>
                      </div>`;
          document.getElementById('preorderbunner').innerHTML = htmlNew;
        }
        if(this.variantMetafield?.type !== undefined){
          const type = this.variantMetafield?.type.split('_').join(' ');
          let html = `<div class="bc-order-wrapper"><h3 class="title">${type}</h3>`;
          if(this.variantMetafield?.type === 'pre_order'){
            html += `<p class="message">FYI, ${this.currentVariant.name} ${this.variantMetafield?.pre_order}.</p>${this.getPreOrderModal(this.variantMetafield?.pre_order_expected_date)}`;
            document.getElementById('bc-order-id').innerHTML = `<input type="hidden" name="pre" value="order">
                                  <input type="hidden" name="pre_order_announcement" value="${this.variantMetafield?.pre_order}">
                                  <input type="hidden" name="pre_order_expected_date" value="${this.variantMetafield?.pre_order_expected_date}">`;
            this.toggleAddButton(false, type);
          } else if (this.variantMetafield?.type === 'coming_soon'){
            const monthNames = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const customDate = this.variantMetafield?.pre_order_expected_date.split('-');
            const currentYear = new Date().getFullYear();
            let launchDate = '';
            if(customDate[0]*1 == currentYear){
                launchDate = monthNames[customDate[1]*1] + ' ' + customDate[2]+'th';
            }else{
                launchDate = monthNames[customDate[1]*1] +' '+customDate[2]+'th, ' + customDate[0];
            }
            html += customDate 
            ? `<p class="message">Launches ${launchDate}</p>`
            : '';
            document.getElementById('bc-order-id').innerHTML = '';
          } else {
            html += `<p class="message">Sorry, ${this.currentVariant?.name.replace(this.currentVariant?.title, '')} is sold out in size ${this.currentVariant?.title}.</p>`;
            document.getElementById('bc-order-id').innerHTML = '';
            this.setUnavailable();
          }
          html += `</div>`;
          document.getElementById('preorderbunner').innerHTML = html;
        }
  
      })
        .then(()=>{
          var sel_price = document.querySelector('.product__info-wrapper #productPrice .price-item--regular .money').innerHTML;
          document.querySelector('.reg_price .money').innerHTML = sel_price;
          document.querySelector('.product-buttons-price.sub_price').innerHTML = document.querySelector('.product__info-wrapper #productPrice .price-item--regular').getAttribute('sub_sal_price');
        });
    }
  
    toggleAddButton(disable = true, text, modifyClass = true) {      
      const addButton = document.getElementById(`product-form-${this.dataset.section}`)?.querySelector('[name="add"]');
      if (!addButton) return;
  
      if (disable) {
        addButton.setAttribute('disabled', true);
        addButton.classList.add('bc-sold-out');
        if (text) addButton.querySelector('span.product-form__submit-label').textContent = text;
      } else {
        addButton.removeAttribute('disabled');
        addButton.classList.remove('bc-sold-out');
        if (text) addButton.querySelector('span.product-form__submit-label').textContent = text;
      }
  
      if (!modifyClass) return;
    }
  
    setUnavailable() {
      const addButton = document.getElementById(`product-form-${this.dataset.section}`)?.querySelector('[name="add"]');
      if (!addButton) return;
      addButton.querySelector('span.product-form__submit-label').textContent = window.variantStrings.unavailable;
      document.getElementById(`price-${this.dataset.section}`)?.classList.add('visibility-hidden');
    }
  
    getVariantData() {
      this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }
  
    getVariantMetafields() {
      this.variantMetafields = this.variantMetafields || JSON.parse(this.querySelector("#product-variants-metafields").textContent);
      return this.variantMetafields;
    }
  
    getPreOrderModal(date){
      let preOrderModal = `<modal-opener class="product-popup-modal__opener no-js-hidden" data-modal="#PopupModal-preorder">
          <button id="ProductPopup-preorder" class="product-popup-modal__button link bc-pre-order-learn" type="button" aria-haspopup="dialog">Learn more here</button>
          </modal-opener>
          <modal-dialog id="PopupModal-preorder" class="product-popup-modal">
          <div role="dialog" aria-modal="true" class="product-popup-modal__content" tabindex="-1">
          <button id="ModalClose-preorder" type="button" class="product-popup-modal__toggle" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-close" fill="none" viewBox="0 0 18 17">
          <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor">
          </path></svg>
          </button>
          <h2>SPECIAL ORDERS</h2>
          <p>Any order that has a specific ship out date will ship out close to that date. If you order anything else that is currently in stock (does not say ships out on ${date} date) it will ship immediately and the remaining items will ship out when we receive them in our warehouse in a separate package. Please email us if you have any questions.</p>
          </div>
          </modal-dialog>`;
       return preOrderModal;
    }
  
  }
  
  customElements.define('variant-selects', VariantSelects);
  
  class VariantRadios extends VariantSelects {
    constructor() {
      super();
    }
  
    updateOptions() {
      const fieldsets = Array.from(this.querySelectorAll('fieldset'));
      this.options = fieldsets.map((fieldset) => {
        if(fieldset.querySelector('.selected-value') != null){
            fieldset.querySelector('.selected-value').innerText = Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
            if(fieldset.getAttribute('product-option').indexOf('olor') >= 0 && document.querySelector('#media-option-style') != null){
               document.querySelector('#media-option-style').innerText = '.product__media-item.grid__item.alt-'+Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value + '{display:block;}';
            }
            return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
        }
      });
    }
  }
  
  customElements.define('variant-radios', VariantRadios);