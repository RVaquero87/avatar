$(document).ready(function () {

    //COMMUN

    classForMacAndIE();

    var clickEventFilter = ((document.ontouchstart !== null) ? 'click' : 'touchstart');


    //SHOW OPTIONS BOX 

    var buttonNavItem = $('.first-navigation li a');
    var navigationOptionsBox = $('.navigation-options');
    var navigationOptionsBoxItem = $('.navigation-options > div');

    var CloseButtonNavigationOption = $('.navigation-options .close-options');
    
    CloseButtonNavigationOption.on(clickEventFilter, function(){

        buttonNavItem.removeClass('active');
        navigationOptionsBox.removeClass('active');
        navigationOptionsBoxItem.removeClass('active');

    });

    buttonNavItem.on(clickEventFilter, function(){

        var dataButtonNavItem = $(this).attr('data-options');
        var IdNavigationOptionsBoxItem = $(`#${dataButtonNavItem}`);

        if(dataButtonNavItem == 'accesories' && $(this).parent().hasClass('active')){
            
            navigationOptionsBox.removeClass('active');
            navigationOptionsBoxItem.removeClass('active');
            buttonNavItem.removeClass('active');  
            $(this).parent().removeClass('active')

        } else if(dataButtonNavItem == 'accesories' && !$(this).hasClass('active')){

            navigationOptionsBox.removeClass('active');
            navigationOptionsBoxItem.removeClass('active');
            buttonNavItem.removeClass('active');  
            $(this).parent().addClass('active')

        } else if(IdNavigationOptionsBoxItem.hasClass('active')){

            navigationOptionsBox.removeClass('active');
            navigationOptionsBoxItem.removeClass('active');
            $(this).removeClass('active');

        } else if(!IdNavigationOptionsBoxItem.hasClass('active')){

            navigationOptionsBox.addClass('active');
            navigationOptionsBoxItem.removeClass('active');    
            IdNavigationOptionsBoxItem.addClass('active');   
            buttonNavItem.removeClass('active');  
            $(this).addClass('active');  

        } 
        
    });

    //SHOW COPY SVG AND SHOW IN PICTURE 

    var buttonsOptionsItem = $('.navigation-options a') 
    
    buttonsOptionsItem.on(clickEventFilter, function(){
        
        var buttonOptionItemActive = $(this);
        var idBoxParentActive = $(this).parent().attr('id');
        var boxTypePicture = $(`.avatars-box-picture #picture-${idBoxParentActive}`);  

        copyCodeDiv(buttonOptionItemActive, boxTypePicture);

        buttonNavItem.removeClass('active');
        navigationOptionsBox.removeClass('active');
        navigationOptionsBoxItem.removeClass('active');

    });
    

});

var btnListaTableVinagresItemsId = $(this).attr('id');
btnListaTableVinagresItemsData = $('[data-tipo=' + btnListaTableVinagresItemsId +']');

btnListaTableVinagresItemsData.addClass('active');

//Detectar IE/MAC e incluir clase

function classForMacAndIE() {
    
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');

    if (msie > 0) {
        $('body').addClass('only-ie');

        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);

    }

    var trident = ua.indexOf('Trident/');

    if (trident > 0) {
        $('body').addClass('only-ie');

        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');

    if (edge > 0) {

        $('body').addClass('only-ie');
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);

    }


    if (navigator.userAgent.indexOf('Mac') > 0) {
        $('body').addClass('only-mac');
    }

    // other browser
    return false;

}

function copyCodeDiv(itemCopyBox, whereCopyBox){

    whereCopyBox.empty();
    itemCopyBox.clone().appendTo(whereCopyBox);

    console.log('hola');
    

}