window.onload=function(){
  var zhixian=document.getElementsByClassName('zhixian');
  for(var i=0;i<zhixian.length;i++){
    zhixian[i].index=i;
    zhixian[i].onclick=function(){
      for(var j=0;j<zhixian.length;j++){
      	zhixian[j].style.backgroundColor='#E4E4E4'
      	
      }
     zhixian[this.index].style.backgroundColor='#A5A5A5'
    }
  }





}