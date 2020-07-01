class CateList {
    constructor(FDom, dataUrl) {
        this.FDom = FDom;
        this.url = dataUrl;
        this.index = 0;
        this.data = null;
        this.cateList = null;
    }
    init() {
        this.getData();
        this.createUI();
        this.createEvent();
    }
    getData() {
        $.ajax({
            type: "get",
            url: this.url,
            dataType: "JSON",
            success: function (response) {
                this.data = response;
            }
        });
    }

    createUI() {
        this.cateList = $('<div class="cateList-container"></div>');
        let html1 = this.data.map((item1, idx1) => {
            let cateli = $(`<li><div class=cateshow data-catelistIndex=${idx1}>${item1.title}</div><span>></span><li>`);

            let html2 = item1.list.map((item2, idx2) => {
                return `
                <div class="cateHideContent">
                <img src=${item2.imgUrl}>
                <p>${item2.dsc}</p>
                </div>
                `
            }).join('')
            cateli.append(`<div class="catehide">${html2}</div>`)
            return cateli;
        }).join("");
        this.cateList.append(html1);
    }

    createEvent() {
        $(".cateshow").on("mouseenter", function (e) {
            $(".catehide").removeClass("current")
            this.next().next().addClass("current")
        })
        $(".cateHideContent").on("mouseenter", function () {
            this.addClass("current");
        })
        $(".cateHideContent").on("mouseleave", function () {
            this.removeClass("current");
        })
    }
}