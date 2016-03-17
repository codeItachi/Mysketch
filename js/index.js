var sketch=angular.module('sketch',[]);
sketch.controller('sketchController', ['$scope', function($scope){
  //选中谁 有选中效果

/*  $scope.changeover=function(index){
  zhixian[index].classList.add("changelast");
  }
   $scope.changeout=function(index){
    zhixian[index].classList.remove("changelast");
  }*/
 //颜色的存储 
  $scope.colors=['purple','green','blue','yellow','brow','pink','orange','gold','gray','Maroon'];
  var canvas=document.querySelector('#canvas');
  var ctx=canvas.getContext('2d');
  var current;
//清空画板  
  $scope.clearCanvas=function(){
    ctx.clearRect(0,0,838,538);
    current=null;

  }

   //新建
  $scope.newSet=function(){
    if(current){
      if(confirm('是否保存')){
        location.href=canvas.toDataURL();
      }
    }
    current=null;
  }

 //保存画板 
  $scope.savesCanvas=function(ev){
   if(current){
    ev.srcElement.href= canvas.toDataURL();

    ev.srcElement.download = "mypainting.png";

  }else{
    alert("空画布")
  }
  
}

//默认样式
$scope.cssState={
  fillStyle:'#000',
  strokeStyle:'#000',
  lineWidth:1,
  style:'stroke'
}
//选择填充还是画线函数
$scope.setStyle=function(s){
  $scope.cssState.style=s;
}
//数据的存储
$scope.tools={  
  直线:'line',
  圆形:'arc',
  矩形:'rect',
  铅笔:'pen',
  橡皮:'erase'
}
//选择用什么工具绘图
$scope.settool=function(tool){
  $scope.tool=tool;
}
//选择工具的实现
var setmousemove={
  arc:function(e){
   canvas.onmousemove=function(ev){
     ctx.clearRect(0,0,838,538);
     if(current){ ctx.putImageData(current,0,0);}

     ctx.beginPath();
     var srcObj = e.target || e.srcElement;
     var a = e.offsetX  || (e.clientX - srcObj.getBoundingClientRect().left);
      var b = e.offsetY  || (e.clientY - srcObj.getBoundingClientRect().top);
     var r=Math.abs(ev.offsetX-a);
     ctx.arc(a,b,r,0,Math.PI*2);
     if($scope.cssState.style=="fill"){
       ctx.fill();
     }else if($scope.cssState.style=="stroke"){
      ctx.stroke();
    }
  }
},
erase:function(e) {
  canvas.onmousemove = function(ev){
    ctx.clearRect(ev.offsetX-10,ev.offsetY-10,20,20);
  }
},
line:function(e){
 canvas.onmousemove=function(ev){


   ctx.clearRect(0,0,838,538); 
//读取canvas区域
   	if(current){ctx.putImageData(current,0,0);}

     ctx.beginPath();
      var srcObj = e.target || e.srcElement;
     var a = e.offsetX  || (e.clientX - srcObj.getBoundingClientRect().left);
      var b = e.offsetY  || (e.clientY - srcObj.getBoundingClientRect().top);
     ctx.moveTo(a,b);		
     ctx.lineTo(ev.offsetX,ev.offsetY);
     ctx.stroke();

   }
 },
 pen:function(e){
  ctx.beginPath();

  ctx.moveTo(e.offsetX,e.offsetY);
  canvas.onmousemove = function(ev) {
    ctx.clearRect(0,0,838,538); 
    if(current){
      ctx.putImageData(current,0,0);
      ctx.lineTo(ev.offsetX,ev.offsetY);
      ctx.stroke();
    }

  }
},
rect:function(e){
 canvas.onmousemove=function(ev){


   ctx.clearRect(0,0,838,538); 
//读取画板的区域   
   	if(current){ctx.putImageData(current,0,0);}

     ctx.beginPath();
      var srcObj = e.target || e.srcElement;
     var a = e.offsetX  || (e.clientX - srcObj.getBoundingClientRect().left);
      var b = e.offsetY  || (e.clientY - srcObj.getBoundingClientRect().top);
     var w=(ev.offsetX-a);
     var h=(ev.offsetY-b);
     if($scope.cssState.style=='fill'){
      ctx.fillRect(a+0.5,b+0.5,w,h);
    }
    else{
     ctx.strokeRect(a+0.5,b+0.5,w,h);
   }


 }
}
}
$scope.tool='line'
//鼠标按下触发的事件
canvas.onmousedown=function(e){
 setmousemove[$scope.tool](e);
 ctx.strokeStyle=$scope.cssState.strokeStyle;
 ctx.fillStyle=$scope.cssState.fillStyle;
 ctx.lineWidth=$scope.cssState.lineWidth;
 canvas.onmouseup=function(){
  canvas.onmouseup=null
  canvas.onmousemove=null;
  current=ctx.getImageData(0,0,838,538);
}
}
}])