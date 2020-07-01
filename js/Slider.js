class Slider{
    constructor(Fdom,dataUrl){
        this.Fdom=Fdom;
        this.url=dataUrl;
        this.Sliderbox=null;
        this.Sliderpoint=null;
        this.Slidercontroller=null;
        this.data=null;
        this.index=0;
        this.len=0;
    }
    //执行所有文件
    init(){
        this.getData()
        this.createUI();
        this.createEvent();
    }
    // 发送请获得数据
    getData(){
        let that=this;
        $.ajax({
            type: "get",
            url: this.url,
            dataType: "JSON",
            success: function (response) {
                that.data = response;
                that.len=that.data.length;
            }
        });
    }
    //创建界面
    createUI(){
        this.createSliderbox();
        this.createPoint();
        this.createController();
    }
    //创建轮播主体
    createSliderbox(){
        this.Sliderbox=$('<div class="banner-container"></div>')
        let Html=this.data.map((item,idx)=> `<li class="sliderItem ${idx?"":"current"}" data-bannerIndex=${idx}><a href="${item.url}"><img src=${item.img}></a></li>`).join("");
        this.Sliderbox.html(Html);
        this.Fdom.append(this.Sliderbox);
    }
    // 创建点控制器
    createPoint(){
        let html=this.data.map((item,idx)=>`<li class="sliderPoints ${idx?"":"current"}" data-bannnerIndex=${idx}><li>`)
        this.Sliderpoint=$(`<div class="sliderPoint>${html}<div>`);
        this.Fdom.append(this.Sliderpoint);
    }
    // 创建左右控制器
    createController(){
        this.Slidercontroller=$('<div class="sliderController"><span id="sliderLeft" class="sliderControllers"><</span><span id="sliderRight" class="sliderControllers">></span></div>')
        this.Fdom.append(this.Slidercontroller);
    }
    // 创建事件
    createEvent(){
        this.imgChange();
        this.autoPlay();
        this.controllerEvent();
        this.pointEvent();
    }
    //图片变化
    imgChange(){
        // 处理边界
        this.index=this.index===this.len?0:this.index<0?this.len-1:this.index;
        $(`.silderItem[data-bannerIndex="${this.index}"]`).addClass("current").sblings().removeClass("current");
        $(`.sliderPoints[data-bannerIndex="${this.index}"]`).addClass("current").sblings().removeClass("current");
    }
    //自动播放
    autoPlay(){
        let that =this;
        this.playing = setInterval(()=>{
            that.index++;
            that.imgChange();
        },2000)
    }
    // 左右点击
    controllerEvent(){
        // 左点击
        let that = this;
        this.Slidercontroller.on("click",function (e) { 
            clearInterval(that.playing);
            if(e.target.id=="sliderLeft")that.index--;
            else if(e.target.id =="sliderRight")that.index++;
            that.imgChange();
            that.autoPlay();
        })
    }
    // 点控制
    pointEvent(){
        let that= this;
        this.Sliderpoint.on("click"),function (e) {  
            clearInterval(that.playing);
            that.index=$(e.target).prop("data-bannerIndex");
            that.imgChange();
            that.autoPlay();
        }
    }
}