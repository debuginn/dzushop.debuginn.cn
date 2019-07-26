/**
 * 组件 js 方法执行
 * @冷颖鑫 lengyingxin8966@gmail.com
 * 2017-12-28
 */
(function (window, document, $, $componentObject) {
    // 组件处理对象。
    function componentObject() {
        // 组件列表
        this.componentItem = {};
    };
    // 添加组件
    componentObject.prototype.add = function (name, callback) {
        if (name && callback) {
            if (this.componentItem[name]) {
                throw name + " In existence";
            }
            this.componentItem[name] = callback;
        } else {
            throw "Name and the execution function cannot be empty ";
        }
    };
    // 执行组件方法
    componentObject.prototype.render = function (name, element) {
        try {
            var callback = this.componentItem[name];
            if (callback) {
                callback($(element));
            } else {
                throw {
                    msg: name + " is Null",
                    componentRender: name,
                    element: $(element)
                };
            }
        } catch (error) {
            console.error(error);
        } finally {
            $(element).removeAttr("componentRender");
        }

    };
    // 执行所有组件的 方法
    componentObject.prototype.renderAll = function () {
        var _this = this;
        $("[componentRender]").each(function (i, e) {
            try {
                _this.render($(e).attr("componentRender"), e);
            } catch (error) {
                console.error(error);
            }
        });
    };

    window.$componentObject = new componentObject();
    // 页面加载完成渲染所有方法
    $(function () {
        window.$componentObject.renderAll();
    });
})(window, document, jQuery, window.$componentObject || {});