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
            console.log(this);
            console.log(this.getAttribute("data-bannerIndex"));
            that.index = this.getAttribute("data-bannerIndex");
            that.imgChange();
            that.autoPlay();
        })
    }
}