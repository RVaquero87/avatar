$(document).ready(function () {

    //COMMUN

    classForMacAndIE();

    var clickEventFilter = ((document.ontouchstart !== null) ? 'click' : 'touchstart');

    //SVG LOADING

    var buttonsOptionsItem = $('.navigation-options div a.options-inner-item')    
    
    buttonsOptionsItem.each(function(n){

        var idBoxOptionsItem = $(this).parent().attr('id');

        //console.log(idBoxOptionsItem);
        
        var idButtonsOptionsItem = $(this).attr('id');
        var rootSVG = `./common/img/avatar/${idBoxOptionsItem}/${idButtonsOptionsItem}.svg`;

        htmlInclude($(this), rootSVG);

    });

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
    
    buttonsOptionsItem.on(clickEventFilter, function(){
        
        var buttonOptionItemActive = $(this);
        var idBoxParentActive = $(this).parent().attr('id');
        var boxTypePicture = $(`.avatars-box-picture #picture-${idBoxParentActive}`);  
        var boxTypePictureMinFocus = $(`.avatars-box-picture-min  > div.active-focus`);  
        var boxTypePictureMin = $(`.avatars-box-picture-min #picture-${idBoxParentActive}-min`);  

        copyCodeDiv(buttonOptionItemActive, boxTypePicture);
        copyCodeDiv(buttonOptionItemActive, boxTypePictureMin);

        buttonNavItem.removeClass('active');
        navigationOptionsBox.removeClass('active');
        navigationOptionsBoxItem.removeClass('active');
        boxTypePictureMinFocus.removeClass('active-focus');
        boxTypePictureMin.addClass('active active-focus');


    });

    //ACTIVE MIN PICTURE

    var buttonsPictureMin = $('.avatars-box-picture-min > div ')
    
    buttonsPictureMin.on(clickEventFilter, function(){

        if( $(this).hasClass('active-focus') ){

            buttonsPictureMin.removeClass('active-focus');

        } else {

            buttonsPictureMin.removeClass('active-focus');
            $(this).addClass('active-focus')
            
        }

    }); 

    //ACTIVE IN PICTURE

    var buttonsPicture = $('.avatars-box-picture > div ')
    
    buttonsPicture.on(clickEventFilter, function(){

        var buttonsPictureActive = $(this).attr('id');        
        var buttonsPictureMin = $(`.avatars-box-picture-min > div`)
        var buttonsPictureMinActive = $(`.avatars-box-picture-min #${buttonsPictureActive}-min`);
        
        if( !buttonsPictureMinActive.hasClass('active-focus') ){

            buttonsPictureMin.removeClass('active-focus');
            buttonsPictureMinActive.addClass('active-focus')

        }

    }); 


    //MOVER POSITION

    var buttonPositionPicture = $('.avatars-box-buttons-position .avatars-box-buttons-position-item');

    buttonPositionPicture.on(clickEventFilter, function(){

        if(buttonsPictureMin.hasClass('active-focus')){

            var buttonsPictureMinActiveID = $('.avatars-box-picture-min > div.active-focus').attr('id');  
            buttonsPictureMinActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
            var buttonPositionPictureID = $(this).attr('id');        
            var boxPicturePosition = $(`.avatars-box-picture #${buttonsPictureMinActiveID}`);    
            var topBoxPicturePosition = boxPicturePosition.position();        

            switch(buttonPositionPictureID){
                case 'position-top':
                    topBoxPicturePosition = `${topBoxPicturePosition.top - 1}px`;                
                    boxPicturePosition.css('top', topBoxPicturePosition);
                break;
                case 'position-bottom':
                    topBoxPicturePosition = `${topBoxPicturePosition.top + 1}px`;                
                    boxPicturePosition.css('top', topBoxPicturePosition);  
                break;
                case 'position-left':
                    topBoxPicturePosition = `${topBoxPicturePosition.left - 1}px`;                
                    boxPicturePosition.css('left', topBoxPicturePosition);   
                break;
                case 'position-right':
                    topBoxPicturePosition = `${topBoxPicturePosition.left + 1}px`;               
                    boxPicturePosition.css('left', topBoxPicturePosition);
                break;
            }

        }

    });


    //WIDTH Buttons

    var buttonSizePicture = $('.avatars-box-buttons-size .avatars-box-buttons-size-item');
    buttonSizePicture.on(clickEventFilter, function(){

        if(buttonsPictureMin.hasClass('active-focus')){

            var buttonsPictureMinActiveID = $('.avatars-box-picture-min > div.active-focus').attr('id');  
            buttonsPictureMinActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
            var buttonSizePictureID = $(this).attr('id');  
            var boxPictureSize = $(`.avatars-box-picture  #${buttonsPictureMinActiveID}`);         
            var mxwboxPictureSize = parseInt(boxPictureSize.css('max-width')); 
                    
            switch(buttonSizePictureID){
                case 'size-max':
                    mxwboxPictureSize = `${mxwboxPictureSize + 1}px`;                       
                    boxPictureSize.css('max-width', mxwboxPictureSize);
                break;
                case 'size-min':
                        mxwboxPictureSize = `${mxwboxPictureSize - 1}px`;                
                        boxPictureSize.css('max-width', mxwboxPictureSize); 
                break;
            }

        }

    });



    //DELETE Buttons

    var buttonDeletePicture = $('.avatars-box-buttons-delete #delete-box');
    buttonDeletePicture.on(clickEventFilter, function(){

        if(buttonsPictureMin.hasClass('active-focus')){

            var buttonsPictureMinActive = $('.avatars-box-picture-min > div.active-focus')
            var buttonsPictureMinActiveID = buttonsPictureMinActive.attr('id');  
            buttonsPictureMinActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
            var boxPictureDelete = $(`.avatars-box-picture  #${buttonsPictureMinActiveID}`);    
            buttonsPictureMinActive.removeClass('active-focus active');
            boxPictureDelete.empty();
        }

    });

    //DELETE ALL Buttons

    //var buttonDeleteAllPicture = $('.avatars-box-buttons-delete-all #delete-box-all');
    
    //buttonDeleteAllPicture.on(clickEventFilter, function(){
        
        //var buttonsPictureMin = $('.avatars-box-picture-min > div.active');

        //if(buttonsPictureMin.length){

            //buttonsPictureMin.each(function(itemActiveMin){

               // var itemActiveMinID = buttonsPictureMin[itemActiveMin].attr('id'); 
               // itemActiveMinID = itemActiveMinID.slice(0,itemActiveMinID.length-4);
               // var boxPictureDelete = $(`.avatars-box-picture  #${itemActiveMinID}`);
               // boxPictureDelete.empty();     
                // buttonsPictureMin.removeClass('active-focus active');
               // buttonsPictureMin.empty();
     
            // });
     
       // }
        
   // });

    //COlOR IRO JS
      
    var colorPicker = new iro.ColorPicker(".avatars-box-colors", {
        width: 280,
        color: "rgb(255, 0, 0)",
        borderWidth: 1,
        borderColor: "#fff",
    });
      
    
    colorPicker.on(["color:change"], function(color){  
        
        var buttonsPictureMinActiveID = $('.avatars-box-picture-min > div.active-focus')
        
        if(buttonsPictureMinActiveID.length){

            buttonsPictureMinActiveID = buttonsPictureMinActiveID.attr('id');
            var buttonsPictureActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
            var boxPictureSize = $(`.avatars-box-picture  #${buttonsPictureActiveID} svg path`);
            boxPictureSize.css('fill', color.hexString)

        }

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

//Incluir HTMl

function htmlInclude(fileInclude, whereIncludeFile){

    fileInclude.load(whereIncludeFile);

}

//Copy item y pegarlo en box

function copyCodeDiv(itemCopyBox, whereCopyBox){

    whereCopyBox.empty();
    itemCopyBox.clone().appendTo(whereCopyBox);    

}