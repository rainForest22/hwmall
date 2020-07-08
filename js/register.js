$(() => {
    let options = {
        userid: {
            reg: "/^1[3-9]\\d{9}$/.test(val)",
            msg: "请输入正确的手机号"
        },
        pwd: {
            reg: "/^\\w{8,16}$/.test(val)",
            msg: "密码不符合要求"
        },
        cfpwd: {
            reg: "val===$.trim($('#pwd').val())",
            msg: "两次密码不一致"
        },
        imageCode: {
            reg: "imgCodeTarget == val",
            msg: "输入的验证码不正确！！！",
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
        if ($("span:empty").length != 4) return;
        //将提交信息存入data
        let data = {
            userid: $.trim($("#userid").val()),
            username: $.trim($("#username").val()),
            pwd: md5($.trim($("#pwd").val())).slice(-10)
        }
        //发送请求
        $.ajax({
            type: "get",
            url: "http://localhost:3100/user/register",
            data,
            dataType: "JSON",
            success: function (response) {
                switch (response.status) {
                    case -1:
                        console.log(response.msg);
                        break;
                    case 0:
                        console.log(response.msg);
                        break;
                    case 1:
                        console.log(response.msg);
                        sessionStorage.setItem("user_name", data.username);
                        sessionStorage.setItem("user_id", data.userid);
                        location.href = "../hwmall/home.html";
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