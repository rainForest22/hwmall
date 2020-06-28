$(()=>{
    let options={
        username:{
            reg:"/^1[3-9]\\d{9}$/.test(val)",
            msg:"请输入正确的手机号"
        },
        pwd:{
            reg:"/^\\w{8,16}$/.test(val)",
            msg:"密码不符合要求"
        },
        cfpwd:{
            reg:"val===$.trim($('#pwd').val())",
            msg:"两次密码不一致"
        }
    }

    $("#username,#pwd,#cfpwd").on("blur",function(){
   
        
        let val = $.trim($(this).val())
        console.log($(this).next());
        $(this).next().next().text(`${eval(options[this.id].reg)?"":options[this.id].msg}`)
    })
})