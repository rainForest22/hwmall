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
        let html = `<a class="floor-content" style="background: no-repeat center/100% url(${this.typedata.imgurl})" href="#"></a>`
        html += this.data.map((item=>`<a href="./detail.html" class="floor-content"><img src=${item.good_src}><h3>${item.good_name}</h3><p>${item.good_dsc}</p><span>￥${item.good_price}</span></a>`)).join("")
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
        html += this.data.map((item=>`<a href="./detail.html" class="floor-content"><img src=${item.good_src}><h3>${item.good_name}</h3><p>${item.good_dsc}</p><span>￥${item.good_price}</span></a>`)).join("")
        this.bottom=$(`<div class="floor-B">${html}</div>`)
        this.Floor.append(this.bottom)
    }
}