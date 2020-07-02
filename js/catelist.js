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
        $(".cateshow").on("mouseenter", function (e) {
            $(".catehide").removeClass("current")
            $(this).next().addClass("current")
        })
        $(".cateshow").on("mouseleave", function (e) {
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