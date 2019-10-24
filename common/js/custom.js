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
        var panelColor = $('.avatars-box-colors');

        copyCodeDiv(buttonOptionItemActive, boxTypePicture);
        copyCodeDiv(buttonOptionItemActive, boxTypePictureMin);

        buttonNavItem.removeClass('active');
        navigationOptionsBox.removeClass('active');
        navigationOptionsBoxItem.removeClass('active');
        boxTypePictureMinFocus.removeClass('active-focus');
        boxTypePictureMin.addClass('active active-focus');

        if(!panelColor.hasClass('active')){
            panelColor.addClass('active');
        }


    });

    //ACTIVE MIN PICTURE

    var buttonsPictureMin = $('.avatars-box-picture-min > div ');
    var panelColor = $('.avatars-box-colors');
    
    buttonsPictureMin.on(clickEventFilter, function(){

        if( $(this).hasClass('active-focus') ){

            buttonsPictureMin.removeClass('active-focus');
            panelColor.removeClass('active');

        } else {

            buttonsPictureMin.removeClass('active-focus');
            panelColor.addClass('active');
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
            
    var mouseStillDown = false;
    var buttonPositionPicture = $('.avatars-box-buttons-position .avatars-box-buttons-position-item');

    buttonPositionPicture.mousedown(function(){
        $(this).addClass("avatars-box-buttons-position-item-selected");
        movingPiece();
    }).mouseup(function() {
        $(this).removeClass("avatars-box-buttons-position-item-selected");
        clearInterval(mouseStillDown);
        mouseStillDown = false;
    }).mouseout(function() {
        $(this).removeClass("avatars-box-buttons-position-item-selected");
        clearInterval(mouseStillDown);
        mouseStillDown = false;
    });

    function movingPiece(){

        if(buttonsPictureMin.hasClass('active-focus')){
            
            var buttonPositionPictureID = $(".avatars-box-buttons-position-item-selected").attr('id');
            var buttonsPictureMinActiveID = $('.avatars-box-picture-min > div.active-focus').attr('id');  
            buttonsPictureMinActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
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

        if (!mouseStillDown) {
            mouseStillDown = setInterval(movingPiece, 100);
        }
    
    }
        
    //Mover en Picture

    var box = $('.avatars-box-picture > div');

    var drag = {
        elem: null,
        x: 0,
        y: 0,
        state: false
    };
    var delta = {
        x: 0,
        y: 0
    };

    box.mousedown(function(e) {
        if (!drag.state) {
            drag.elem = this;
            drag.x = e.pageX;
            drag.y = e.pageY;
            drag.state = true;
        }
        return false;
    });


    $(document).mousemove(function(e) {
        if (drag.state) {
            delta.x = e.pageX - drag.x;
            delta.y = e.pageY - drag.y;
            var cur_offset = $(drag.elem).offset();
            $(drag.elem).offset({
                left: (cur_offset.left + delta.x),
                top: (cur_offset.top + delta.y)
            });

            drag.x = e.pageX;
            drag.y = e.pageY;
        }
    });

    $(document).mouseup(function() {
        if (drag.state) {
            drag.state = false;
        }
    });

    //WIDTH Buttons

    var mouseStillDown2 = false;
    var buttonSizePicture = $('.avatars-box-buttons-size .avatars-box-buttons-size-item');

    buttonSizePicture.mousedown(function(){
        $(this).addClass("avatars-box-buttons-size-item-selected");
        sizePiece();
    }).mouseup(function() {
        $(this).removeClass("avatars-box-buttons-size-item-selected");
        clearInterval(mouseStillDown2);
        mouseStillDown2 = false;
    }).mouseout(function() {
        $(this).removeClass("avatars-box-buttons-size-item-selected");
        clearInterval(mouseStillDown2);
        mouseStillDown2 = false;
    });

    function sizePiece(){

        if(buttonsPictureMin.hasClass('active-focus')){
            
            var buttonSizePictureID = $(".avatars-box-buttons-size-item-selected").attr('id');
            var buttonsPictureMinActiveID = $('.avatars-box-picture-min > div.active-focus').attr('id');  
            buttonsPictureMinActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
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

        if (!mouseStillDown2) {
            mouseStillDown2 = setInterval(sizePiece, 100);
        }
    
    }

    //DELETE Buttons

    var buttonDeletePicture = $('.avatars-box-buttons-delete #delete-box');
    
    buttonDeletePicture.on(clickEventFilter, function(){

        if(buttonsPictureMin.hasClass('active-focus')){

            var buttonsPictureMinActive = $('.avatars-box-picture-min > div.active-focus')
            var buttonsPictureMinActiveID = buttonsPictureMinActive.attr('id');  
            buttonsPictureMinActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
            var boxPictureDelete = $(`.avatars-box-picture  #${buttonsPictureMinActiveID}`);    
            buttonsPictureMinActive.removeClass('active-focus active');
            panelColor.removeClass('active')
            boxPictureDelete.empty();
        }

    });

    //DELETE ALL Buttons

    var buttonDeleteAllPicture = $('.avatars-box-buttons-delete-all #delete-box-all');
    
    buttonDeleteAllPicture.on(clickEventFilter, function(){
        
        var buttonsPictureMin = $('.avatars-box-picture-min > div.active')
        var boxPicture = $(`.avatars-box-picture > div`);
        var boxPictureClothes = $(`.avatars-box-picture > div#picture-clothes`);
            boxPicture.empty();
            buttonsPictureMin.removeClass('active active-focus');
            panelColor.removeClass('active');
            $('.options-clothes #clothes-01').clone().appendTo(boxPictureClothes);
     
    });

    //TECLADO MOVER / MAS / MENOS /Delete

    $(document).bind('keydown', function(e) {

        if(buttonsPictureMin.hasClass('active-focus')){

            var buttonsPictureMinActive = $('.avatars-box-picture-min > div.active-focus')
            var buttonsPictureMinActiveID = $('.avatars-box-picture-min > div.active-focus').attr('id');  
            buttonsPictureMinActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
            var boxPicture = $(`.avatars-box-picture #${buttonsPictureMinActiveID}`);    
            var topBoxPicturePosition = boxPicture.position();      
            var mxwboxPictureSize = parseInt(boxPicture.css('max-width')); 
            var left = 37;
            var up = 38;
            var right = 39;
            var down = 40;
            var add = 107;
            var add2 = 187;
            var subtract = 109;
            var subtract2 = 189;
            var eraser = 46;
            var eraser2 = 8;

            if (e.keyCode == left) {
                topBoxPicturePosition = `${topBoxPicturePosition.left - 1}px`;                
                boxPicture.css('left', topBoxPicturePosition);   
            } else if (e.keyCode == up) {
                topBoxPicturePosition = `${topBoxPicturePosition.top - 1}px`;                
                boxPicture.css('top', topBoxPicturePosition);
            } else if (e.keyCode == right) {
                topBoxPicturePosition = `${topBoxPicturePosition.left + 1}px`;               
                boxPicture.css('left', topBoxPicturePosition);
            } else if (e.keyCode == down) {
                topBoxPicturePosition = `${topBoxPicturePosition.top + 1}px`;                
                boxPicture.css('top', topBoxPicturePosition);  
            } else if (e.keyCode == add || e.keyCode == add2) {
                mxwboxPictureSize = `${mxwboxPictureSize + 1}px`;                       
                boxPicture.css('max-width', mxwboxPictureSize);
            } else if (e.keyCode == subtract || e.keyCode == subtract2) {
                mxwboxPictureSize = `${mxwboxPictureSize - 1}px`;                
                boxPicture.css('max-width', mxwboxPictureSize); 
            } else if (e.keyCode == eraser || e.keyCode == eraser2){
                buttonsPictureMinActive.removeClass('active-focus active');
                panelColor.removeClass('active')
                boxPicture.empty();
            }    

        }

    });

    $(document).bind('keyup', function() {

        if(buttonsPictureMin.hasClass('active-focus')){

        var buttonsPictureMinActiveID = $('.avatars-box-picture-min > div.active-focus').attr('id');  
        buttonsPictureMinActiveID = buttonsPictureMinActiveID.slice(0,buttonsPictureMinActiveID.length-4);
        var boxPicture = $(`.avatars-box-picture #${buttonsPictureMinActiveID}`);    
        boxPicture.stop();

        }

    });

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

    //Hacer foto a div AVATAR

    var buttonCamaraJPG = $('.avatars-box-buttons-camara-dowload #camara-jpg');
    var contenidoAvatar = $('.avatars-box-picture');
    
    buttonCamaraJPG.on(clickEventFilter, function(){

        html2canvas(document.querySelector("#capture")).then(function(canvas) {
            document.body.appendChild(canvas);
        });

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