let menustate = true
let page = 1
let total_pages = 2
$(document).ready(e=>{
    for(let i = 0; i<total_pages;i++){
        $("#carousel-pagination").append(
            `
            <div class="page-dash">
                        
                    </div>
            `
        )

    }
    
    $($(`.page-dash`)[page-1]).addClass('page-dash-highlighted')
})
$('main').scroll(e=>{
    //console.log($('main').scrollTop());
    if($('main').scrollTop()>200){
        
        $('nav').height(0)
        $('nav').width('fit-content')
        $('nav').css('opacity', 0)
        $('.menu').css('opacity', 1)
        $('.menu').css('transform', 'rotate(-90deg)');
        menustate = false;
    }
    else{
        menustate = true
      

        $('nav').height('50vh')

        $('nav').css('opacity', 1)
        $('.menu').css('opacity', 0)
        $('.menu').css('transform', 'rotate(15deg)');
    }

    if($('main').scrollTop()>700){
        $('.menu').css('background-color', 'black')
        $('nav ul li a').css('color', 'black')
        $('nav ul').css('background-color','white')
    }
    else{
        $('nav ul li a').css('color', 'white')
        $('nav ul').css('background-color','transparent')
        $('.menu').css('background-color', 'white')

    }
})
function menu(state){
    if($('main').scrollTop()>200){
        if(state){
            
          

            $('nav').height('50vh')
            $('nav').css('opacity', 1)
            $('.menu').css('opacity', 0)
            $('.menu').css('transform', 'rotate(15deg)');
        }
        else{
            $('nav').height(0)
        
            $('nav').css('opacity', 0)
            $('.menu').css('opacity', 1)
            $('.menu').css('transform', 'rotate(-90deg)');
            
        }
    }
}
$('body').mousemove(e=>{
    
    if($(e.target).is('.menu')){
       
            menustate = true;
            menu(menustate)

        
    }
    else if(!$(e.target).is('nav, nav *')){
        menustate=false
        menu(false)
    }
    
    $("#cursor").css('top', e.clientY)
    $("#cursor").css('left', e.clientX)

    if($(e.target).is('a,.carousel-nav *, .menu, .work-image img, #close-preview')){
        $('#cursor').css('height', '50px')
        $('#cursor').css('width', '50px')
        $('#cursor').css('transform', `translate(-25px, -25px)`)
    }
    else{
        $('#cursor').css('height', '10px')
        $('#cursor').css('width', '10px')
        $('#cursor').css('transform', `translate(-5px, -5px)`)
    }
})
let pos = 0;
$('#right-arrow').click(e=>{
    page++
    switchPage()
   
})
$('#left-arrow').click(e=>{
    page--
    switchPage()
})
function switchPage(){
    if(page<1){
        page = total_pages
    }
    if(page>total_pages){
        page=1
    }
    $(`.page-dash`).removeClass('page-dash-highlighted')
    $($(`.page-dash`)[page-1]).addClass('page-dash-highlighted')
    $('.carousel-page').css('opacity',0)
    $('.carousel-page').css('pointer-events','none')
    $(`#page-${page}`).css('opacity',1)
    $(`#page-${page}`).css('pointer-events','unset')
}
$("#page-1 img").click(e=>{
    $('#preview').css('display', 'flex');
})
$('#close-preview').click(e=>{
    $('#preview').css('display','none');
})