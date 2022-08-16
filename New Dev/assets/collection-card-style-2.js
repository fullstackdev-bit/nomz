document.querySelectorAll('.single-quick-add').forEach((item)=>{  
  item.addEventListener("click", function(event){
    this.closest(".card-wrapper").querySelector('.product-form__submit').click();
    this.closest(".quick-add-cart-wrapper").classList.add('loading');
    setTimeout(()=>{this.closest(".quick-add-cart-wrapper").classList.remove('loading');},500)
  })    
})
document.querySelectorAll('.product-price-review-color .bc-card-color__item').forEach((item)=>{  
  item.addEventListener("click", function(event){
    if(this.classList.contains('selected')){
      return false;
    }else{
      var option_val = this.getAttribute('data-option');
      var parient = this.closest(".card-wrapper");
      var option_index = "option-" + this.closest('.bc-card-color__list').getAttribute('option_index');
       var size_index = '';
      if(parient.querySelector('.quick-add-area .size-options') != null){
         size_index = "option-" + parient.querySelector('.quick-add-area .size-options').getAttribute('option_index');
      }
      
      var feature_img = parient.querySelector('.variant-select option['+option_index+' ="'+option_val+'"]').getAttribute('variant-img');
      var other_options = parient.querySelectorAll('.variant-select option['+option_index+' ="'+option_val+'"]');
      if(feature_img != ''){
        var basic_url = parient.querySelector('.main-feature-img').getAttribute('src').split('/products/')[0]+'/';
        parient.querySelector('.main-feature-img').setAttribute('src',basic_url+feature_img);
        parient.querySelector('.main-feature-img').setAttribute('srcset',basic_url+feature_img);
      }
      if(size_index == ''){
        other_options.forEach((option_item)=>{
          if(option_item.getAttribute('available') != 'true'){            
            parient.querySelector('.single-quick-add').setAttribute('disabled',true);
            parient.querySelector('.single-quick-add').innerText='Sold Out';
            parient.querySelector('form input[name="id"]').value = option_item.getAttribute('value');
          }else{
            parient.querySelector('.single-quick-add').removeAttribute('disabled');
            parient.querySelector('.single-quick-add').innerText='Quick add →';
            parient.querySelector('form input[name="id"]').value = option_item.getAttribute('value');
          }
        })
      }else{
        other_options.forEach((option_item)=>{
          if(option_item.getAttribute('available') != 'true'){
            var size_val = option_item.getAttribute(size_index);
            parient.querySelector('.size-option[data-option="'+size_val+'"]').classList.add('disable');
          }else{
            var size_val = option_item.getAttribute(size_index);
            parient.querySelector('.size-option[data-option="'+size_val+'"]').classList.remove('disable');
          }
        })
      }
      
      this.closest('.bc-card-color__list').querySelector('.selected').classList.remove('selected');
      this.classList.add('selected');      
      
    } 
  })    
})
document.querySelectorAll('.quick-add-area .size-option').forEach((item)=>{  
  item.addEventListener("click", function(event){    
    var option_val = this.getAttribute('data-option');
    var parient = this.closest(".card-wrapper");
    var option_index = "option-" + this.closest('.size-options').getAttribute('option_index');
    var color_index = '';
    var color_option = '';
    if(parient.querySelector('.product-price-review-color .bc-card-color__list') != null){
      color_index = "option-" + parient.querySelector('.product-price-review-color .bc-card-color__list').getAttribute('option_index');
      color_option = parient.querySelector('.product-price-review-color .bc-card-color__item.selected').getAttribute('data-option');
    }
    if(color_index == ''){
      var variant_option = parient.querySelector('.variant-select option['+option_index+' ="'+option_val+'"]');
      
    }else{
      var variant_option = parient.querySelector('.variant-select option['+option_index+' ="'+option_val+'"]['+color_index+' ="'+color_option+'"]');     
      
    }
    parient.querySelector('form input[name="id"]').value = variant_option.getAttribute('value');
    parient.querySelector('.product-form__submit').click();
    parient.querySelector(".quick-add-cart-wrapper").classList.add('loading');
    setTimeout(()=>{parient.querySelector(".quick-add-cart-wrapper").classList.remove('loading');},500);
     
  })    
})

