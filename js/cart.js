$(function () {
    //判断用户是否已登录
    let user_id = sessionStorage.getItem("user_id") || "";
    let user_name = sessionStorage.getItem("user_name") || "";
    if (user_id && user_name) {
        $("#unlogin_status").html(`<a href="#">${user_name}:欢迎您<a>`);
        $(".loginWarn").css("display", "none")
    } else {
        return;
    }
    $.ajax({
        type: "get",
        url: "http://localhost:8083/",
        data: {
            user_id: user_id
        },
        dataType: "JSON",
        success: function (response) {
            switch (response.status) {
                case 0:
                    break;
                case 1:
                    $(".cartLess").css("display", "none");
                    console.log(response.msg);
                    renderUI(response.msg)
                    break;
                default:
                    break;
            }
        }
    });
    function renderUI(orderData) {
        let html = orderData.map(item => {
            return `
            <ul class="cartGood" gid=${item.good_id}>
                <li class="list_chk">
                    <input type="checkbox" class="son_check">
                    <label></label>
                </li>
                <li class="list_con">
                    <div class="list_img"><img src=${item.good_src} alt=""></div>
                    <div class="list_text">${item.good_dsc}</div>
                </li>
                <li class="list_price">
                  <p class="price">￥${item.good_price}</p>
                </li>
                <li class="list_amount">
                  <div class="amount_box">
                    <a href="javascript:;" class="reduce">-</a>
                    <input type="text" value=${item.num} class="sum">
                    <a href="javascript:;" class="plus">+</a>
                  </div>
                </li>
                <li class="list_sum">
                    <p class="sum_price" data-price="23">￥${item.num * item.good_price}</p>
                </li>
                <li class="list_op">
                    <p class="del"><a href="javascript:;" class="delBtn">删除</a></p>
                </li>
            </ul>
             `
        }).join("");
        $(".cartList-C").html(html);
    }
    function dataTool(data) {
        let arr = [];
        data.forEach(item => {
            let result = arr.filter((ele) => ele.store == item.shopName);
            if (result.length == 0) {
                arr.push({ store: item.shopName, goods: [] });
            }
        })

        /* 把所有的数据依次加入到对象中去 */
        data.forEach(item => {
            arr.forEach(ele => {
                if (ele.store == item.shopName) {
                    ele.goods.push(item);
                }
            })
        })
        return arr;
    }

    /* 全选的功能：点击的时候切换选中的状态(改变自己的状态 + 改变所有其他复选框的状态) */
    $("#all").click(function() {
        // console.log(this, $(this).is(":checked"));
        $(this).next().toggleClass("mark");
        $(".cartBox").find("input[type=checkbox]").next().toggleClass("mark");
        computedTotal();
    })


    /* 封装方法计算商品的总数和总价 */
    function computedTotal() {
        // let flag = $(".order_item").find(".son_check").next().hasClass("mark");
        let ele = $(".order_item").filter(function() {
            return $(".son_check", this).next().hasClass("mark") == true;
        })

        /* 计算数量 */
        let total = 0;
        let totalPrice = 0;
        ele.each(function(index, item) {
            console.log(index, item, $(item).find(".sum").val(), $(item).find(".sum_price").text().slice(1));
            total += $(item).find(".sum").val() * 1;
            totalPrice += $(item).find(".sum_price").text().slice(1) * 1;
        })

        $(".piece_num").text(total);
        $(".total_text").text("￥" + totalPrice.toFixed(2));
    }
})