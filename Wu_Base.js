
var $=function(args){
    return new Wu_Base(args);
};
function Wu_Base(args){
    this.elements=[];
    this.secs=0;
    if(typeof args =="string" ){
        switch (args.charAt(0)){
            case "#":
                this.id(args.substring(1));
                break;
            case ".":
                this.className(args.substring(1));
                break;
            default:
                this.tagName(args);
        }
    }
    /*else if(typeof args =="object"){
         if(args!=undefined)
         {   /!*this 是一个对象 undefined也是个对象 区别于typeof返回的字符串undefined*!/
         /!*this.elements[0]=args;*!/
             this.elements[index]=args;
         }
     }*/
}
Wu_Base.prototype.find=function(str){
    var child=[];
    for(var i=0;i<this.elements.length;i++){
        switch (str.charAt(0)){
            case ".":
                var all=document.getElementsByTagName("*");
                for(var k=0;k<all.length;k++){
                    if(all[k].className==str.substring(1)){
                        child.push(all[k])
                    }
                }
                break;
            case "#":
                child.push(this.elements[i].getElementById(str.substring(1)));
                break;
            default:
                var tagN=this.elements[i].getElementsByTagName(str);
                for(var j=0;j<tagN.length;j++){
                    child.push(tagN[j]);
                }
        }
    }
    this.elements =child;
    return this;
}
Wu_Base.prototype.id=function(id){
    this.elements.push(document.getElementById(id));
    return this;
};
Wu_Base.prototype.className=function(classname){
    var all=document.getElementsByTagName("*");
    for(var i=0;i<all.length;i++){
        if(all[i].className==classname){
            this.elements.push(all[i])
        }
    }
    return this;
};
Wu_Base.prototype.tagName=function(tagname){
    var tagN=document.getElementsByTagName(tagname);
    for(var i=0;i<tagN.length;i++){
        this.elements.push(tagN[i]);
    }
    return this;
};
Wu_Base.prototype.css=function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==1){
            return getStyle(this.elements[i],attr);
        }
        this.elements[i].style[attr]=value;
    }
    return this;
};
Wu_Base.prototype.html=function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==0){
           return this.elements[i].innerHTML;
        }
        this.elements[i].innerHTML=str;
    }
    return this;
};
Wu_Base.prototype.click=function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick=fn;
    }
    return this;
};
Wu_Base.prototype.blur=function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onblur=fn;
    }
    return this;
};
Wu_Base.prototype.focus=function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onfocus=fn;
    }
    return this;
};
Wu_Base.prototype.eq=function(num){
    var dex=this.elements[num];
    this.elements=[];
    this.elements[0]=dex;
    return this;
};
Wu_Base.prototype.addClass=function(cn){
    for(var i=0;i<this.elements.length;i++){
        if(!this.elements[i].className.match(new RegExp('(\\s|^)'+cn+'(\\s|$)'))){
            this.elements[i].className +=" "+cn;
        }
    }
    return this;
};
Wu_Base.prototype.removeClass=function(cn){
    for(var i=0;i<this.elements.length;i++){
        if(this.elements[i].className.match(new RegExp('(\\s|^)'+cn+'(\\s|$)'))){
            this.elements[i].className= this.elements[i].className.replace(new RegExp('(\\s|^)'+cn+'(\\s|$)'),'');
        }
    }
    return this;
};
Wu_Base.prototype.hover=function(over,out){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onmouseover=over;
        this.elements[i].onmouseout=out;
    }
    return this;
};

Wu_Base.prototype.show=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display="block";
    }
    return this;
};
Wu_Base.prototype.hide=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display="none";
    }
    return this;
};
Wu_Base.prototype.center= function (width, height) {
    var top=0;
    var left=0;
    top=(getInner().height-height)/2;
    left=(getInner().width-width)/2;
  /*  if(typeof window.innerWidth !="undefined"){
        top=(window.innerHeight-height)/2; /!*兼容火狐*!/
        left=(window.innerWidth-width)/2;
    }
    else {
        top=(document.documentElement.clientHeight-height)/2;
        left=(document.documentElement.clientWidth-width)/2;
    }*/
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.top=top+"px";
        this.elements[i].style.left=left+"px";
    }
    return this;
};
Wu_Base.prototype.drag= function (){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onmousedown=function(ev){
            var _this=this;
            var event=window.event||ev;
            var diX=event.clientX-_this.offsetLeft;
            var diY=event.clientY-_this.offsetTop;
            if(typeof ev.preventDefault !='undefined'){
                ev.preventDefault();
            }
            else {
                ev.returnValue=false;
            }
            document.onmousemove=function(ev){
                var event=window.event||ev;
                var left=event.clientX-diX;
                var top=event.clientY-diY;

                if(left<=0){
                    left=0
                }
                else if(left>=getInner().width-_this.offsetWidth){
                    left=getInner().width-_this.offsetWidth;
                }
                if(top<=0){
                    top=0;
                }
                else if (top>=getInner().height-_this.offsetHeight){
                    top=getInner().height-_this.offsetHeight;
                }
                _this.style.left=left+"px";
                _this.style.top=top+"px";
            };
            document.onmouseup=function(){
                this.onmousemove=null;
                this.onmouseup=null;
            }
        };
    }
    return this;
};
Wu_Base.prototype.scrollTop=function(fstat,fend){
    var btn=this.elements[0];
    var istop = true;
    var timer=0;
    var clientheight =getInner().height;
    window.onscroll=function(){
        var ostop=document.documentElement.scrollTop || document.body.scrollTop;
        if (ostop>=clientheight){
            fstat();
        }
        else {
            fend();
        }
        if(!istop){
            clearInterval(timer);
            timer=0;
        }
        else {
            istop=false;
        }
    };
    btn.onclick= function () {
        function top(){
            var Scroll=document.documentElement.scrollTop||document.body.scrollTop;
            var speed=Math.floor(-Scroll/5);
            document.documentElement.scrollTop = document.body.scrollTop =Scroll+speed;
            istop =true;
            if(Scroll<=0){
                clearInterval(timer);
                timer=0;
            }
        }
        if(timer==0){
            timer=setInterval(top,20);
        }
    };
    return this;
};
Wu_Base.prototype.each=function (fn) {
    for (var i=0;i<this.elements.length;i++){
        this.elements[i].index=i;
        this.elements[i]=fn;
    }
    return this;
};

Wu_Base.prototype.on=function(type,listner){
    for(var i=0;i<this.elements.length;i++){
        addEvent(this.elements[i],type,listner)
    }
    return this;
};

Wu_Base.prototype.off=function(type,listner){
    for(var i=0;i<this.elements.length;i++){
        removeEvent(this.elements[i],type,listner)
    }
    return this;
};