$(function () {  
    // 生成轮播图    
    new Slider($(".banner"),"http://localhost/hwmall/sever/data/sliderImg.json").init();
    // 生成清单表
    new CateList($(".catelist"),"http://localhost/hwmall/sever/data/cateList.json").init();
    
})