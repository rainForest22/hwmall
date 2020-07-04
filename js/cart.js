$(() => {
    /* 登录状态的处理 */
    /* 检查本地是否保存user_id和user_name的值，如果本地有，那么表示当前是登录状态 */
    /* 如果没有，那么表示当前是未登录的状态 */
    let user_id = sessionStorage.getItem("user_id") || "";
    let user_name = sessionStorage.getItem("user_name") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
        $(".userInfo").text(`${user_name}:欢迎您`);
        $(".status").text("注销");
    } else {
        $(".userInfo").text(`匿名用户:欢迎您`);
        $(".status").text("登录");
    }

    $(".status").click(function() {
        if ($(this).text() == "登录") {
            location.href = "./login.html";
        } else {
            localStorage.removeItem("user_id")
            localStorage.removeItem("user_name");
            /* 重新加载 */
            window.location.reload();
        }
    })

    /* 发请求获取购物车的商品信息 */
    $.ajax({
        url: "http://localhost:8083/",
        data: { user_id },
        dataType: "json"
    }).done(data => {
        data = dataTool(data);
        renderUI(data);
    })

   


    function renderUI(orderData) {
        // console.log(orderData);
        let html = "";

        orderData.forEach(data => {

            let listHtml = data.goods.map(item => {
                return `
                <ul class="order_lists order_item" gid=${item.good_id}>
                <li class="list_chk">
                  <input type="checkbox" class="son_check">
                  <label></label>
                </li>
                <li class="list_con">
                  <div class="list_img"><img src=${item.src} alt=""></div>
                  <div class="list_text">${item.title}</div>
                </li>
                <li class="list_price">
                  <p class="price">￥${item.price}</p>
                </li>
                <li class="list_amount">
                  <div class="amount_box">
                    <a href="javascript:;" class="reduce">-</a>
                    <input type="text" value=${item.num} class="sum">
                    <a href="javascript:;" class="plus">+</a>
                  </div>
                </li>
                <li class="list_sum">
                  <p class="sum_price" data-price="23">￥${item.num * item.price}</p>
                </li>
                <li class="list_op">
                  <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                </li>
              </ul>
                `
            }).join("");

            let cartBoxHtml = `<div class="cartBox">
            <div class="shop_info">
                    <div class="all_check">
                      <input type="checkbox" id="shop_a" class="shopChoice">
                      <label for="shop_a" class="shop"></label>
                    </div>
                    <div class="shop_name">
                      店铺：<a href="">${data.store}</a>
                    </div>
            </div>
            <div class="order_content">${listHtml}</div>
        </div>
        `
            html += cartBoxHtml;
        })

        $(html).insertAfter(".cartMain_hd");
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