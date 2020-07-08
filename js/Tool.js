// 查询购物车数量
function cartNum(user_id) { 
    $.ajax({
        type: "get",
        url: "http://localhost:3100/cart/num",
        data: {user_id:user_id},
        dataType: "JSON",
        success: function (response) {
            $(".cart_num").text("("+response.num+")")
        }
    });
}
// 生成轮播图
class Slider {
    constructor(Fdom, dataUrl) {
        this.Fdom = Fdom;
        this.url = dataUrl;
        this.Sliderbox = null;
        this.Sliderpoint = null;
        this.Slidercontroller = null;
        this.data = [];
        this.index = 0;
        this.len = 0;
        this.wrap = $('<div class="banner-wrap wrap"></div>');
    }
    //执行所有文件
    init() {
        this.wrap.appendTo(this.Fdom);
        let that = this;
        $.ajax({
            type: "get",
            url: this.url,
            dataType: "JSON",
            success: function (response) {
                that.data = response;
                that.len = that.data.length;
            that.createUI();
            that.createEvent();
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    // 发送请获得数据
    getData() {
        let that = this;
        $.ajax({
            type: "get",
            url: this.url,
            dataType: "JSON",
            success: function (response) {
                that.data = response;
                console.log(response);
                console.log(that.data);

                that.len = that.data.length;
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    //创建界面
    createUI() {
        this.createSliderbox();
        this.createPoint();
        this.createController();
    }
    //创建轮播主体
    createSliderbox() {
        this.Sliderbox = $('<div class="banner-container"></div>')
        let Html = this.data.map((item, idx) => `<li class="sliderItem ${idx ? "" : "current"}" data-bannerIndex=${idx}><a href="${item.url}"><img src=${item.img}></a></li>`).join("");
        this.Sliderbox.html(Html);
        this.Fdom.append(this.Sliderbox);
    }
    // 创建点控制器
    createPoint() {
        let Html = this.data.map((item, idx) => `<li class="sliderPoints${idx ? "" : ' current'}" data-bannerIndex=${idx}></li>`).join("")
        this.Sliderpoint = $(`<div class="sliderPoint">${Html}</div>`);
        this.wrap.append(this.Sliderpoint);
    }
    // 创建左右控制器
    createController() {
        this.Slidercontroller = $('<div class="sliderController"><span id="sliderLeft" class="sliderControllers"><</span><span id="sliderRight" class="sliderControllers">></span></div>')
        this.wrap.append(this.Slidercontroller);
    }
    // 创建事件
    createEvent() {
        this.imgChange();
        this.autoPlay();
        this.stopPlay();
        this.controllerEvent();
        this.pointEvent();
    }
    //图片变化
    imgChange() {
        // 处理边界
        this.index = this.index === this.len ? 0 : this.index < 0 ? this.len - 1 : this.index;
        $(`.sliderItem[data-bannerIndex=${this.index}]`).addClass("current").siblings().removeClass("current");
        $(`.sliderPoints[data-bannerIndex="${this.index}"]`).addClass("current").siblings().removeClass("current");
    }
    //自动播放
    autoPlay() {
        let that = this;
        this.playing = setInterval(() => {
            that.index++;
            that.imgChange();
        }, 5000)
    }
    // 鼠标悬停停止自动播放
    stopPlay() {
        this.Sliderbox.on("mouseenter", () => {
            clearInterval(this.playing);
        })
        this.Sliderbox.on("mouseleave", () => {
            this.autoPlay();
        })
    }
    // 左右点击
    controllerEvent() {
        let that = this;
        this.Slidercontroller.on("click", function (e) {
            clearInterval(that.playing);
            if (e.target.id == "sliderLeft") that.index--;
            else if (e.target.id == "sliderRight") that.index++;
            that.imgChange();
            that.autoPlay();
        })
    }
    // 点控制
    pointEvent() {
        let that = this;
        $(".sliderPoints").on("mouseenter", function () {     
            clearInterval(that.playing);
            that.index = this.getAttribute("data-bannerIndex");
            that.imgChange();
            that.autoPlay();
        })
    }
}
// 生成楼层图
class FloorA{
    constructor(FDom,type){
        this.FDom = FDom;
        this.Floor=null;
        this.data = null;
        this.type=type;
        this.head=null;
        this.bottom=null;
        this.typedata=null;
    }
    init(){
        let that =this;
        // 发送请求获取标题图片
        const p1 = new Promise((resolve,reject)=>{
            $.ajax({
                type: "get",
                url: "./sever/data/floors.json",
                data: {
                    type : this.type
                },
                dataType: "JSON",
                success: function (response) {                    
                    that.typedata=response.find(item=>item.type===that.type)
                    resolve();
                }
            });
        });
        //发送请求获取数据库数据
        const p2 = new Promise((resolve,reject)=>{
            $.ajax({
                type: "get",
                url: "http://localhost:3100/good/floor",
                data:{
                    type:this.type
                },
                dataType: "JSON",
                success: function (response) {
                    that.data= response;
                    resolve();
                    
                }
            });
        })
        //请求结束之后执行以下函数
        Promise.all([p1,p2]).then(()=>{
            that.createUI();        
        })
    }
    createUI(){
        this.Floor=$('<div class="floor wrap" ></div>')
        this.createTitle();
        this.createBottom();
        this.FDom.append(this.Floor)
    }
    createTitle(){
        this.head=$(`<div class="floor-H clear_fix"><h2>${this.typedata.title}</h2><span><a href="#">查看更多></a></span></div>`)
        this.Floor.append(this.head);
    }
    createBottom(){
        let html = `<a class="floor-content typeA" style="background: no-repeat center/100% url(${this.typedata.imgurl})" href="#"></a>`
        html += this.data.map((item=>`<a href="./detail.html" class="floor-content" data-goodId="${item.good_id}"><img src=${item.good_src}><h3>${item.good_name}</h3><p>${item.good_dsc}</p><span>￥${item.good_price}</span></a>`)).join("")
        this.bottom=$(`<div class="floor-B">${html}</div>`)
        this.Floor.append(this.bottom)
    }
}


class FloorB{
    constructor(FDom,type){
        this.FDom = FDom;
        this.Floor=null;
        this.data = null;
        this.type=type;
        this.head=null;
        this.bottom=null;
        this.typedata=null;
    }
    init(){
        let that =this;
        // 发送请求获取标题图片
        const p1 = new Promise((resolve,reject)=>{
            $.ajax({
                type: "get",
                url: "./sever/data/floors.json",
                data: {
                    type : this.type
                },
                dataType: "JSON",
                success: function (response) {
                    that.typedata=response.find(item=>item.type===that.type)
                    resolve();
                }
            });
        });
        //发送请求获取数据库数据
        const p2 = new Promise((resolve,reject)=>{
            $.ajax({
                type: "get",
                url: "http://localhost:3100/good/floor",
                data:{
                    type:this.type
                },
                dataType: "JSON",
                success: function (response) {
                    that.data= response;
                    resolve();
                    
                }
            });
        })
        //请求结束之后执行以下函数
        Promise.all([p1,p2]).then(()=>{
            that.createUI();    
            that.creatEvent();    
        })
    }
    createUI(){
        this.Floor=$('<div class="floor wrap" ></div>')
        this.createTitle();
        this.createBottom();
        this.FDom.append(this.Floor)
    }
    createTitle(){
        this.head=$(`<div class="floor-H clear_fix"><h2>${this.typedata.title}</h2><span><a href="#">查看更多></a></span></div>`)
        this.Floor.append(this.head);
    }
    createBottom(){
        let html = `<a class="floor-content typeB" style="background: no-repeat center/100% url(${this.typedata.imgurl})" href="#"></a>`
        html += this.data.map((item=>`<a href="./detail.html" class="floor-content" data-goodId="${item.good_id}"><img src=${item.good_src}><h3>${item.good_name}</h3><p>${item.good_dsc}</p><span>￥${item.good_price}</span></a>`)).join("")
        this.bottom=$(`<div class="floor-B">${html}</div>`)
        this.Floor.append(this.bottom)
    }

    creatEvent(){
        // 点击时存储商品信息
        $(".floor-content").click(function(){
            sessionStorage.setItem("presetGood",$(this).data("goodid"))
        })
    }
}
// 生成菜单栏
class CateList {
    constructor(FDom, dataUrl) {
        this.FDom = FDom;
        this.url = dataUrl;
        this.index = 0;
        this.data = null;
        this.cateList = null;
    }
    init() {
        let that = this;
        $.ajax({
            type: "get",
            url: this.url,
            dataType: "JSON",
            success: function (response) {
                that.data = response;
                that.createUI();
                that.createEvent();
            }
        });

    }

    createUI() {
        this.cateList = $('<div class="cateList-container"></div>');
        let html1 = this.data.map((item1, idx1) => { 
            let html2 = item1.list.map((item2, idx2) => {
                return `
                <div class="cateHideContent">
                <img src=${item2.imgUrl}>
                <p>${item2.dsc}</p>
                </div>
                `
            }).join('')
            let cateli = `<li><div class="cateshow" data-catelistIndex=${idx1}>${item1.title}<span>></span></div><div class="catehide clear_fix">${html2}</div></li>`;
            return cateli;
        }).join("");
        this.cateList.html(html1);
        this.FDom.append(this.cateList)
    }

    createEvent() {
        $(".cateshow").parent().on("mouseenter", function (e) {
            $(".catehide").removeClass("current")
            $(this).children(".catehide").addClass("current")
        })
        $(".cateshow").parent().on("mouseleave", function (e) {
            $(".catehide").removeClass("current")
        })
        $(".cateHideContent").on("mouseenter", function () {
            $(this).addClass("current");
        })
        $(".cateHideContent").on("mouseleave", function () {
            $(this).removeClass("current");
        })
    }
}

// 放大镜
class magnifying {
    constructor(FDom, url) {
        this.FDom = FDom;
        this.url = url;
        this.minBox = null;
        this.bigBox = null;
        this.area = null;
        this.magnifyingBox = null;
        this.inner = false;
        this.Top = 0;
        this.Left = 0;
        this.width = $(FDom).width();
        this.height = $(FDom).height();
    }
    init() {
        this.createUI()
        this.createEvent()
    }
    // 创建元素
    createUI() {
        this.magnifyingBox = $('<div class="magnifyingBox"></div>')
        this.magnifyingBox.css("position", "relative")
        this.Top = 110;
        this.Left = 360;        
        this.createminBox();
        this.createbigBox();
        this.createArea();
        this.FDom.append(this.magnifyingBox);
    }
    //小盒子
    createminBox() {
        this.minBox = $(`<div class="minBox" style="background-image: url(${this.url}); position: absolute; width: 450px; height: 450px; left: 0px; top: 0px; cursor: move;"></div>`)
        this.minBox.append($(`<img src="${this.url}">`))
        this.magnifyingBox.append(this.minBox);
    }
    //大盒子
    createbigBox() {
        this.bigBox = $(`<div class="bigBox hidden"></div>`)
        this.bigBox.css({
            "background-image": `url(${this.url})`,
            "background-size": "240%",
            "background-position":"center",
            "background-repeat": "no-repeat"
        })
        this.magnifyingBox.append(this.bigBox);
    }
    //放大区域
    createArea() {
        this.area = $(`<div class="area hidden"></div>`);
        this.area.css("position", "absolute");
        this.minBox.append(this.area);
    }
    // 事件
    createEvent() {
        this.enter();
        this.leave();
        this.follow();
    }
    //移动函数
    // 鼠标进入
    enter() {
        let that = this;
        this.minBox.on('mouseover', (e) => {
            that.bigBox.removeClass('hidden')
            that.area.removeClass('hidden')
        })
    }
    // 鼠标移出
    leave() {
        let that = this;
        this.minBox.on('mouseleave', (e) => {
            that.bigBox.addClass('hidden')
            that.area.addClass('hidden')
        })
    }
    // 鼠标移动时放大区域跟随
    follow() {
        let x, y;
        this.minBox.on('mousemove', (e) => {
            x = e.clientX - this.Left - this.width / 6;
            y = e.clientY - this.Top - this.height / 6;
            if (x < 0) this.area[0].style.left = 0;
            else if (x > this.width * 2 / 3) this.area[0].style.left = this.width * 2 / 3 + "px";
            else this.area[0].style.left = x + "px";

            if (y < 0) this.area[0].style.top = 0;
            else if (y > this.height * 2 / 3) this.area[0].style.top = this.height * 2 / 3 + "px";
            else this.area[0].style.top = y + "px";
            this.bigBox.css({
                "background-position": `${-this.area.position().left * 3}px ${-this.area.position().top * 3}px`
            })
        })
    }

}