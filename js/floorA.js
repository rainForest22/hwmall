class Floor{
    constructor(FDom,dataUrl){
        this.FDom = FDom;
        this.url = Url;
        this.Floor=null;
        this.data = null;
    }
    init(){
        let that =this;
        $.ajax({

            type: "get",
            url: "this.url",
            dataType: "JSON",
            success: function (response) {
                that.data= response;
                that.createUI();
                that.createEvent();
            }
        });
    }
    createUI(){
        
    }

    createEvent(){

    }
}