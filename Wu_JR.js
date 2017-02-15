/**
 * Created by Administrator on 2017/1/18/018.
 */
/*浏览器窗口大小*/
function getInner(){
    if(typeof window.innerHeight !="undefined"){
        return{
            width:window.innerWidth,  /*firefox*/
            height:window.innerHeight
        }
    }
    else {
        return{
            width:document.documentElement.clientWidth, /*ie，chrome*/
            height:document.documentElement.clientHeight
        }
    }
}
/*获取样式*/
function getStyle(elements,attr){
    if(typeof window.getComputedStyle !="undefined"){
        return window.getComputedStyle(elements)[attr];
    }
    else if(typeof elements.currentStyle !="undefined"){
        return elements.currentStyle[attr]
    }
}

/*事件绑定*/
function addEvent(ele,type,listner){
    if (ele.addEventListener){
        ele.addEventListener(type,listner);
    }
    else {
        ele.attachEvent("on"+type,listner);
    }
}
/*事件解绑*/
function removeEvent(ele,type,listner){
    if (ele.removeEventListener){
        ele.removeEventListener(type,listner);
    }
    else {
        ele.detachEvent("on"+type,listner);
    }
}

/*鼠标滚轮*/
function wheel(fnup,fndown,ev){
    var oEvent=window.event||ev;
    if (oEvent.detail){
        if (oEvent.detail>0){
            fndown();
        }
        else {
            fnup();
        }
    }
    else  if (oEvent.wheelDelta){
        if (oEvent.wheelDelta>0){
            fnup()
        }
        else {
            fndown()
        }
    }
}