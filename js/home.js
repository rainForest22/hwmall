$(function () {  
    // 生成轮播图    
    new Slider($(".banner"),"http://localhost/hwmall/sever/data/sliderImg.json").init();
    // 生成清单表
    new CateList($(".catelist"),"http://localhost/hwmall/sever/data/cateList.json").init();
    //生成楼层图
    //手机的楼层
    new FloorA($('#phoneFloor'),"phone").init();
    // 笔记本的楼层
    new FloorA($('#laptopFloor'),"laptop").init();
})