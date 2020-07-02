class Floor{
    constructor(FDom,type){
        this.FDom = FDom;
        this.Floor=null;
        this.data = null;
        this.type=type;
    }
    init(){
        let that =this;
        $.ajax({
            type: "get",
            url: "http://localhost:8082/",
            data:{
                type : this.type
            },
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