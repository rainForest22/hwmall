
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
        console.log(this.magnifyingBox[0].getBoundingClientRect());
        
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