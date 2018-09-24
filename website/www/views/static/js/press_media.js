$(function() {
    var flag=0
  $('.menu .nav:first-child').on('click', function(){
      if(flag==1){
          $(this).find('.sub-nav').hide()
          flag=0
      }else{
          $(this).find('.sub-nav').show()
          flag=1
      }
  })

  $('.sub-tit').on('mouseenter', function(){
      $(this).css('height','auto');
      $(this).css('overflow','visible');
  })
  $('.sub-tit').on('mouseleave', function(){
      if($(this).hasClass('cur')){return;}
      $(this).css('height',30+'px');
      $(this).css('overflow','hidden');
  })

})
