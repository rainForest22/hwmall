$(function () {  
    //判断用户是否已登录
    let user_id = sessionStorage.getItem("user_id") || "";
    let user_name = sessionStorage.getItem("user_name") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
        $("#unlogin_status").html(`<a href="#">${user_name}:欢迎您<a>`);
    }
    // 生成轮播图    
    new Slider($(".banner"),"http://localhost/hwmall/sever/data/sliderImg.json").init();
    // 生成清单表
    new CateList($(".catelist"),"http://localhost/hwmall/sever/data/cateList.json").init();
    //生成楼层图
    //手机的楼层
    new FloorA($('#phoneFloor'),"phone").init();
    // 笔记本的楼层
    new FloorA($('#laptopFloor'),"laptop").init();
    //平板的楼层
    new FloorA($('#padFloor'),"pad").init();
    //智能穿戴的楼层
    new FloorB($('#wearFloor'),"wear").init();
    //智能家居层
    new FloorB($('#smartHomeFloor'),"smartHome").init();


})