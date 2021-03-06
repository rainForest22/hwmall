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

    // 购物车商品信息
    $.ajax({
        type: "get",
        url: "http://localhost:3100/cart/gain",
        data: {
            user_id: user_id
        },
        dataType: "JSON",
        success: function (response) {
            switch (response.status) {
                case 0:
                    console.log(response.msg);

                    break;
                case 1:
                    $(".cartLess").css("display", "none");
                    renderUI(response.msg)
                    break;
                default:
                    break;
            }
        }
    });
    cartNum(user_id);
    function renderUI(orderData) {
        let html = orderData.map((item, idx) => {
            return `
            <ul class="cartGood" gid=${item.good_id}>
                <li class="list_chk">
                    <input type="checkbox" class="son_check"  id="son_check_${idx}">
                    <label for="son_check_${idx}"></label>
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
        // 数字变化
        $(".sum").on("blur", function () {
            prePrice(this)
            computedTotal();
            singleDataChange(this);
        })
        $(".reduce").click(function () {
            let num = parseInt($(this).next().val());
            $(this).next().val(`${num > 0 ? num - 1 : 0}`)
            prePrice(this)
            computedTotal();
            singleDataChange(this);
        })
        $(".plus").click(function () {
            let num = parseInt($(this).prev().val());
            $(this).prev().val(num + 1);
            prePrice(this)
            computedTotal();
            singleDataChange(this);
        })
        // 单选的功能
        $(".cartList-C").find("input[type=checkbox]").click(function () {
            $(this).next().toggleClass("mark");
            let ele = $(".cartList-C").find("input[type=checkbox]").next().map((idx, item) => $(item).hasClass("mark"))
            computedTotal();
            for (let i = 0; i < ele.length; i++) {
                if (ele[i] == false) {
                    $(".all").next().removeClass("mark");
                    return;
                }
            }
            $(".all").next().addClass("mark");
        })
        // 删除功能
        $(".delBtn").click(function () {
            $(this).parents(".cartGood").remove();
            if ($(".cartList-C").children().length == 0) {
                $(".cartLess").css("display", "block");
                $(".cartList").css("display", "none")
            }
            singleDelete(this);
            computedTotal()
        })
        // 选中删除
        $(".list_delSel").click(function () {
            let delgid=''
            let ele = $(".cartGood").filter(function () {
                return $(".son_check", this).next().hasClass("mark") == true;
            })
            ele.each((idx, item) => {
                delgid+=$(item).attr('gid')+','
                item.remove();
                computedTotal();
            })
            delgid.slice(0,-1);            
            $.ajax({
                type: "get",
                url: "http://localhost:3100/cart/Delete",
                data: {good_ids:delgid},
                dataType: "JSON",
                success: function (response) {
                    cartNum(user_id);
                }
            });
            if ($(".cartList-C").children().length == 0) {
                $(".cartLess").css("display", "block");
                $(".cartList").css("display", "none")
            }
        })
    }
    /* 全选的功能 */
    $(".all").click(function () {
        $(".all").next().toggleClass("mark");
        $(".all").next().hasClass("mark") ? $(".cartList-C").find("input[type=checkbox]").next().addClass("mark") : $(".cartList-C").find("input[type=checkbox]").next().removeClass("mark");
        computedTotal();
    })

    /* 封装方法计算商品的总数和总价 */
    function computedTotal() {
        let ele = $(".cartGood").filter(function () {
            return $(".son_check", this).next().hasClass("mark") == true;
        })

        /* 计算数量 */
        let total = 0;
        let totalPrice = 0;
        ele.each(function (index, item) {
            total += $(item).find(".sum").val() * 1;
            totalPrice += $(item).find(".sum_price").text().slice(1) * 1;
        })

        $(".piece").text(total);
        $(".totalprice").children().text("￥ " + totalPrice.toFixed(2));
    }
    // 封装计算单个商品价格的方法
    function prePrice(that) {
        let nums = $(that).parent().parent().find(".sum").val();
        let price = $(that).parent().parent().prev().find(".price").text().slice(1);
        $(that).parent().parent().next().find(".sum_price").text(`￥${nums * price}`)
    }
    //与数据库联动
    //修改单个商品数量
    function singleDataChange(that){
        let good_id=$(that).parents(".cartGood").attr('gid');
        let newnum =$(that).parent().find(".sum").val();
        $.ajax({
            type: "get",
            url: "http://localhost:3100/cart/singleChange",
            data: {good_id,num:newnum},
            dataType: "JSON",
            success: function (response) {
                cartNum(user_id);
            }
        });
    }
    //删除单个商品
    function singleDelete(that) {  
        let good_id=$(that).parents(".cartGood").attr('gid');
        $.ajax({
            type: "get",
            url: "http://localhost:3100/cart/singleDelete",
            data: {good_id},
            dataType: "JSON",
            success: function (response) {
                cartNum(user_id);
            }
        });
    }
})