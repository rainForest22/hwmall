$(function () {
    let user_id = sessionStorage.getItem("user_id") || "";
    let user_name = sessionStorage.getItem("user_name") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
        $("#unlogin_status,.loginstauts").html(`<a href="#">${user_name}:欢迎您<a>`);
    }
    let goodid = sessionStorage.getItem("presetGood")
    $.ajax({
        type: "get",
        url: "http://localhost:3100/good/single",
        data: { good_id: goodid },
        dataType: "JSON",
        success: function (response) {
            // 加入放大镜
            new magnifying($('.showimg'), response.good_src).init();
            createUI(response)
        }
    });
    // 数量变化
    let num = $(".num").val();
    //加入购物车
    $(".addCart").click(function () {
        let datas = {
            good_id: goodid,
            user_id:user_id,
            num:num,
        }
        $.ajax({
            type: "put",
            url: "http://localhost:3100/cart/change",
            data: datas,
            dataType: "dataType",
            success: function (response) {
                console.log(response);

            }
        });
    })
})

// 界面渲染
function createUI(data) {
    $(".goodname").text(data.good_name);
    $(".desc").text(data.good_dsc);
    $(".price span").text("￥" + data.good_price);
}



