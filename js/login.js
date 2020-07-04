$(() => {
    let options = {
        userid: {
            reg: "/^1[3-9]\\d{9}$/.test(val)",
            msg: "请输入正确的手机号"
        },
        pwd: {
            reg: "/^\\w{8,16}$/.test(val)",
            msg: "密码不符合要求"
        }
    }
    //验证事件
    $("#userid,#pwd,#cfpwd,#imageCode").on("blur", function () {
        let val = $.trim($(this).val())
        $(this).next().next().text(`${eval(options[this.id].reg) ? "" : options[this.id].msg}`)
    })
    //注册提交
    $("#registerBtn").click(function () {
        $("#userid,#pwd,#cfpwd,#imageCode").trigger("blur");
        if ($("span:empty").length != 2) return;
        //将提交信息存入data
        let data = {
            userid: $.trim($("#userid").val()),
            pwd: md5($.trim($("#pwd").val())).slice(-10)
        }
        //发送请求
        $.ajax({
            type: "get",
            // url: "../sever/registerNode.js",
            url: "http://localhost:8081/",
            data,
            dataType: "JSON",
            success: function (response) {
                switch (response.status) {
                    case 0:
                        console.log(response.msg);
                        break;
                    case 1:
                        console.log(response.msg);
                        sessionStorage.setItem("user_name",response.username);
                        sessionStorage.setItem("user_id",data.userid);
                        location.href="../hwmall/home.html";
                        break;
                    case -1:
                        console.log(response.msg);
                        break;
                    default:
                        break;
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
})