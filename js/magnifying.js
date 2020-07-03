// 放大镜
class magnifying {
    constructor(FDom, url) {
        this.FDom = FDom;
        this.url = url;
        this.minBox = null;
        this.bigBox = null;
        this.area = null;
        this.areaTop = 0;
        this.areaLeft = 0;
        this.magnifyingBox = null;
        this.inner = false;
        this.Top = 0;
        this.Left = 0;
        this.width = $(FDom).width();
        this.height = $(FDom).height();
    }
    init(){
        this.createUI()
        this.createEvent()
    }
    // 创建元素
    createUI() {
        this.magnifyingBox = $('<div class="magnifyingBox"></div>')
        this.magnifyingBox.css("position", "relative")
        this.Top = this.magnifyingBox.position().top;
        this.Left = this.magnifyingBox.position().left;
        this.createminBox();
        this.createbigBox();
        this.createArea();
        this.FDom.append(this.magnifyingBox);
    }
    //小盒子
    createminBox() {
        this.minBox = $(`<div class="minBox" style="background:no-repeat center/100% url(${this.url})"></div>`)
        this.magnifyingBox.append(this.minBox);
    }
    //大盒子
    createbigBox() {
        this.bigBox = $(`<div class="bigBox hidden"></div>`)
        this.bigBox.css({
            "background-image": `url(${this.url})`,
            "background-size": "300%",
            "background-repeat": "no-repeat"
        })
        this.magnifyingBox.append(this.bigBox);
    }
    //放大区域
    createArea() {
        this.area = $(`<div class="area hidden"></div>`);
        this.area.css("position", "absoluted");
        this.areaTop = this.area.position().top;
        this.areaLeft = this.area.position().left;
        this.magnifyingBox.append(this.area);
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
        this.minBox.on('mouseenter', (e) => {
            that.inner = true;
            that.bigBox.removeClass('hidden')
            that.area.removeClass('hidden')
        })
    }
    // 鼠标移出
    leave() {
        let that = this;
        this.minBox.on('mouseleave', (e) => {
            that.inner = false;
            that.bigBox.addClass('hidden')
            that.area.addClass('hidden')
            that.follow();
            that.bigBoxChange();
        })
    }
    // 鼠标移动时放大区域跟随
    follow() {
        this.minBox.on('mousemove', (e) => {
            if (!this.inner) return;
            let x = e.pageX-this.Left-this.width/6;
            let y = e.pageX-this.Top-this.height/6;
            if(x<0)this.areaLeft=0;
            else if(x>this.width*5/6)this.areaLeft=this.width*2/3;
            else this.areaLeft=x;
            if(y<0)this.areaTop=0;
            else if(y>this.width*5/6)this.areaTop=this.width*2/3;
            else this.areaTop=y;
            this.bigBoxChange();
        })
    }
    // 鼠标移动时大盒子显示区域
    bigBoxChange() {
        this.bigBox.css({
            "background-position": `${-this.areaLeft*3}px ${-this.areaTop*3}px`,
        })
    }
}