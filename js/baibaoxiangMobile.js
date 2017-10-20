$(function(){

    var swiper1 = new Swiper('.swiper-container1', {
        direction: 'vertical',
        pagination : '.swiper-pagination1',
        paginationClickable: true,

    });

    var swiper2 = new Swiper('.swiper-container2', {
        pagination : '.swiper-pagination2',
        paginationClickable: true,
    });
    //page8-scroller
    $('.arrow-down').toggle(
        function(){
            $('.arrow-down>img').css({
                'transform':'rotate(180deg)',
                '-ms-transform':'rotate(180deg)',
                '-moz-transform':'rotate(180deg)',
                '-webkit-transform':'rotate(180deg)',
                '-o-transform':'rotate(180deg)'
            });
            $('.page8-scroll').animate({top:"-138vw"},500);
        },
        function (){
            $('.arrow-down>img').css({
                'transform':'rotate(3600deg)',
                '-ms-transform':'rotate(3600deg)',
                '-moz-transform':'rotate(360deg)',
                '-webkit-transform':'rotate(360deg)',
                '-o-transform':'rotate(360deg)'
            });
            $('.page8-scroll').animate({top:"0vw"},500);
    });
});
var autoLb = false;          //autoLb=true为开启自动轮播
var autoLbtime = 1;         //autoLbtime为轮播间隔时间（单位秒）
var touch = true;           //touch=true为开启触摸滑动
var slideBt = true;         //slideBt=true为开启滚动按钮
var slideNub;               //轮播图片数量

//窗口大小改变时改变轮播图宽高
$(window).resize(function(){
    $(".slide").height($(".slide").width()*0.56);
});

$(function(){
    $(".slide").height($(".slide").width()*0.56);
    slideNub = $(".slide .img").size();             //获取轮播图片数量
    for(i=0;i<slideNub;i++){
        $(".slide .img:eq("+i+")").attr("data-slide-imgId",i);
    }

//根据轮播图片数量设定图片位置对应的class
    if(slideNub==1){
        for(i=0;i<slideNub;i++){
            $(".slide .img:eq("+i+")").addClass("img3");
        }
    }
    if(slideNub==2){
        for(i=0;i<slideNub;i++){
            $(".slide .img:eq("+i+")").addClass("img"+(i+3));
        }
    }
    if(slideNub==3){
        for(i=0;i<slideNub;i++){
            $(".slide .img:eq("+i+")").addClass("img"+(i+2));
        }
    }
    if(slideNub>3&&slideNub<6){
        for(i=0;i<slideNub;i++){
            $(".slide .img:eq("+i+")").addClass("img"+(i+1));
        }
    }
    if(slideNub>=6){
        for(i=0;i<slideNub;i++){
            if(i<5){
                $(".slide .img:eq("+i+")").addClass("img"+(i+1));
            }else{
                $(".slide .img:eq("+i+")").addClass("img5");
            }
        }
    }

//根据轮播图片数量设定轮播图按钮数量
    if(slideBt){
        for(i=1;i<=slideNub;i++){
            $(".slide-bt").append("<span data-slide-bt='"+i+"' onclick='tz("+i+")'></span>");
        }
        $(".slide-bt").width(slideNub*34);
        $(".slide-bt").css("margin-left","-"+slideNub*17+"px");
    }

//自动轮播
    if(autoLb){
        setInterval(function(){
            right();
        }, autoLbtime*1000);
    }


    if(touch){
        k_touch();
    }
    slideLi();
    imgClickFy();
})

var valI = 0;
//右滑动
function right(){
    var fy = new Array();
    for(i=0;i<slideNub;i++){
        fy[i]=$(".slide .img[data-slide-imgId="+i+"]").attr("class");
    }
    for(i=0;i<slideNub;i++){
        if(i==0){
            $(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[slideNub-1]);
        }else{
            $(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[i-1]);
        }
    }
    imgClickFy();
    slideLi();
//小圆点on
    valI++;
    if(valI>= 0 && valI<5){
        $('.slide-dot>.slide-radius').removeClass('on');
        $('.slide-dot>.slide-radius:eq('+valI+')').addClass('slide-radius on');

    }
    else if(valI>=5 && valI<12){
        $('.slide-dot>.slide-radius:eq(4)').removeClass('on');
        $('.item-list').css('background','#7d86c9');
    }
    else if(valI >= 12 ){
         valI = 0;
        $('.item-list').css('background','rgba(0,0,0,.2)');
        $('.slide-dot>.slide-radius:eq('+valI+')').addClass('slide-radius on');
    }

}

//左滑动
function left(){
    var fy = new Array();
    for(i=0;i<slideNub;i++){
        fy[i]=$(".slide .img[data-slide-imgId="+i+"]").attr("class");
    }
    for(i=0;i<slideNub;i++){
        if(i==(slideNub-1)){
            $(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[0]);
        }else{
            $(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[i+1]);
        }
    }
    imgClickFy();
    slideLi();


//小圆点on
    valI--;
    if(valI <= 0){
        valI = 12;
        $('.item-list').css('background','#7d86c9');
        $('.slide-dot>.slide-radius').removeClass('on');
    }
    else if(valI <= 5){
        $('.item-list').css('background','rgba(0,0,0,.2)');
        $('.slide-dot>.slide-radius').removeClass('on');
        $('.slide-dot>.slide-radius:eq('+(valI-1)+')').addClass('slide-radius on');

    }
}

//轮播图片左右图片点击翻页
function imgClickFy(){
    $(".slide .img").removeAttr("onclick");
    $(".slide .img2").attr("onclick","left()");
    $(".slide .img4").attr("onclick","right()");
}

//修改当前最中间图片对应按钮选中状态
function slideLi(){
    var slideList = parseInt($(".slide .img3").attr("data-slide-imgId")) + 1;
    $(".slide-bt span").removeClass("on");
    $(".slide-bt span[data-slide-bt="+slideList+"]").addClass("on");
}

//轮播按钮点击翻页
function tz(id){
    var tzcs = id - (parseInt($(".slide .img3").attr("data-slide-imgId")) + 1);
    if(tzcs>0){
        for(i=0;i<tzcs;i++){
            setTimeout(function(){
                right();
            },1);
        }
    }
    if(tzcs<0){
        tzcs=(-tzcs);
        for(i=0;i<tzcs;i++){
            setTimeout(function(){
                left();
            },1);
        }
    }
    slideLi();
}

//触摸滑动模块
function k_touch() {
    var _start = 0, _end = 0, _content = document.getElementById("slide");
    var _startY = 0,_endY = 0,_contentY = document.getElementById("slide");

    _content.addEventListener("touchstart", touchStart, false);
    _content.addEventListener("touchmove", touchMove, false);
    _content.addEventListener("touchend", touchEnd, false);

    _contentY.addEventListener("touchstartY", touchStartY, false);
    _contentY.addEventListener("touchmoveY", touchMoveY, false);
    _contentY.addEventListener("touchendY", touchEndY, false);

    function touchStart(event) {
        var touch = event.targetTouches[0];
        _start = touch.pageX;
    }
    function touchMove(event) {
        var touch = event.targetTouches[0];
        _end = (_start - touch.pageX);
    }


    function touchStartY(event) {
        var touchY = event.targetTouches[0];
        _startY = touchY.pageY;
    }
    function touchMoveY(event) {
        var touchY = event.targetTouches[0];
        _endY = (_startY - touchY.pageY);
    }

    function touchEnd(event) {
        if (_end < -50) {
            left();
            _end=0;
        }else if(_end > 50){
            right();
            _end=0;
        }
    }

    function touchEndY(event) {
        if (_endY < -20) {
            left();
            _endY=0;
        }else if(_endY > 20){
            right();
            _endY=0;
        }
    }



}

