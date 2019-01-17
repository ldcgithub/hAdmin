$(function(){
    //菜单点击
    /*var J_iframe;
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');
        if(typeof(url) != "undefined"){
            $("#J_iframe").attr('src',url);
            $(".J_menuItem").removeClass("menu-on");
            $(this).addClass("menu-on");
            return false;
        }
    });*/

    var j_rel_num = 0;
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');
        var name = $(this).text();


        if(typeof(url) != "undefined"){
            //$("#J_iframe").attr('src',url);
            $('.page-tab-ul li').removeClass('bg_color');


            /*
             * 生成TAB，先判断要请求的页面是否已存在，存在直接显示，不存在新建新的tab
             * */
            var iframetabrel = $('li[url="'+url+'"]').attr('rel');
            if(typeof(iframetabrel) != 'undefined'){
                //存在，直接显示
                show_iframe(iframetabrel);
                $('iframe[page-rel="'+iframetabrel+'"]').attr('src',url); // 刷新点击页面
            }else{
                //不存在，新建iframe
                if(url != '/Center/welcome'){
                    var maxrelnum = $('#page-tab ul li:last').attr('rel');//    最大rel
                    var newrel = Number(maxrelnum) + 1;
                    $('#page-tab ul').append('<li class="bg_color" rel="'+newrel+'" url="'+url+'"><span onclick="show_iframe('+newrel+')">'+name+'</span><span class="c-icom" onclick="close_iframe('+newrel+');" onmouseover="mouseoverBtn()" onmouseout="mouseoutBtn()" ><img id="close-icon" src="../Public/hAdmin/img/close.png"></span></li>');
                    $('#page-list iframe').css('display','none');
                    $('#page-list').append('<iframe page-rel="'+newrel+'" width="100%" height="100%" src="'+url+'" frameborder="0" seamless></iframe>');
                    iframetabrel = newrel;
                }else{
                    show_iframe(0);
                    iframetabrel = 0;
                }
            }
            //  计算左边li长度总和
            var leftLegth = calUlLength(iframetabrel);
            //  当前向左偏离长度
            var leftAbsolut = Math.abs(parseInt($('.page-tab-ul').css('left')));
            //  可视区长度1003.19
            var visiableLength = $('.page_content').width() - 35 - 101;
            //  如果可视区+左偏离小于 leftLegth，
            if(Number(visiableLength) + Math.abs(Number(leftAbsolut))<Number(leftLegth)){
                var leftAdd = Number(leftLegth) - (Number(visiableLength) + Math.abs(Number(leftAbsolut)))
                //左移 leftAdd + leftAbsolut
                click_left(leftAdd + leftAbsolut)
            }


            $(".J_menuItem").removeClass("menu-on");
            $(this).addClass("menu-on");
            return false;
        }
    });


    //  关闭所有 的页面
    $('.close_all').click(function(){
        $('iframe[page-rel!="0"]').remove();
        $('.page-tab-ul li[rel!="0"]').remove();
        show_iframe(0);
    });

    //  关闭其他 的页面
    $('.close_other').click(function(){
        var bg_color_rel = $('li[class="bg_color"]').attr('rel');
        $('iframe[page-rel!="0"][page-rel!="'+bg_color_rel+'"]').remove();
        $('.page-tab-ul li[rel!="0"][rel!="'+bg_color_rel+'"]').remove();
        click_right();
    });

    //  右侧关闭所有和其他，
    $('.close_btn').mouseover(function(){
        $('.tip_button ').css({display:"block"});
    });
    $('.close_btn').mouseout(function(){
        $('.tip_button ').css({display:"none"});

    });

});

function adminlogout(){
    parent.layer.confirm('确定退出您的账户？', {
        btn: ['确定','取消'], //按钮
        shade: [0.5] //显示遮罩
    }, function(){
        location.href = '/Index/logout';
        //parent.layer.msg('的确很重要', {icon: 1});
    }, function(){
        //parent.layer.msg('奇葩么么哒', {shift: 6});
    });
}
function close_iframe(rel){
    $('iframe[page-rel="'+rel+'"]').remove();
    $('li[rel="'+rel+'"]').remove();
    var bg_color_rel = $('li[class="bg_color"]').attr('rel');

    if(isNaN(bg_color_rel)){
        var maxrelnum = $('#page-tab ul li:last').attr('rel');//    最大rel
        $('iframe[page-rel="'+maxrelnum+'"]').css('display','block');

        $('#page-tab ul li:last').addClass('bg_color');
    }else{
        show_iframe(bg_color_rel);
    }

}
//  点击按钮向左移动
function move_left(){
    var maxrelnum = $('#page-tab ul li:last').attr('rel');//    最大rel
    var leftLegth = calUlLength(maxrelnum);

    //  当前向左偏离长度
    var leftAbsolut = Math.abs(parseInt($('.page-tab-ul').css('left')));
    //  可视区长度1003.19
    var visiableLength = $('.page_content').width() - 35;
    //  如果可视区+左偏离小于 leftLegth，
    if(Number(leftLegth) - visiableLength>0){
        var leftmin = 101;
        //左移 leftAdd + leftAbsolut
        click_left(leftAbsolut + leftmin)
    }
}
function click_left(left){
    $('.page-tab-ul').animate({top:'0',left:'-'+left+'px'},500);
}

//  点击按钮向右移动
function click_right(){
    $('.page-tab-ul').animate({top:'0',left:'-35px'},500);
}

function show_iframe(rel,url){
    $('#page-list iframe').css('display','none');
    $('iframe[page-rel="'+rel+'"]').css('display','block');

    //  新加
    $('.page-tab-ul li').removeClass('bg_color');
    $('li[rel="'+rel+'"]').addClass('bg_color');

    calUlLength(rel);
}

//  每个li 移动-上去的 图片
function mouseoverBtn(){
    $('.c-icom').each(function(){
        $(this).mouseover(function(){

            $(this).find('#close-icon').attr('src','../Public/hAdmin/img/error.png');
        });
    });

}
//  每个li 移出-的 图片
function mouseoutBtn(){
    $('.c-icom').each(function(){
        $(this).mouseout(function(){


            $(this).find('#close-icon').attr('src','../Public/hAdmin/img/close.png');
        });
    });
}

function calUlLength(rel){
    var length = 0;
    $('.page-tab-ul li[rel!="'+rel+'"]').each(function(){
        var cur_rel = $(this).attr('rel');
        if(Number(cur_rel)<Number(rel)){
            if(Number(cur_rel) == 0){
                length += Number($(this).width()) + 20;
            }else{
                length += Number($(this).width()) + 45;
            }
        }
    });
    return length;
}
