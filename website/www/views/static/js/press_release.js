$(function() {
    var flag=1
  $('.menu .nav:first-child').on('click', function(){
      if(flag==1){
          $(this).find('.sub-nav').hide()
          flag=0
      }else{
          $(this).find('.sub-nav').show()
          $(this).addClass('cur');
          $(this).siblings().removeClass('cur');
          flag=1
      }
  })

  var aid = Utils.GetQueryString('aid');
  $('.sub-tit[data-aid='+aid+']').addClass('cur');

  var id = Utils.GetQueryString('id');
  if(id){
    $('.sub-tit[data-id='+id+']').addClass('cur');
  }else{
  }
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
