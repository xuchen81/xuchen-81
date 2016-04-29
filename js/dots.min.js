$(function(){var t,r,i=function(t,r){return Math.floor(Math.random()*(r-t))+t},a=new Image,c=i(1,10)
a.src="/img/"+c.toString()+".png"
var e=3
a.onload=function(){t=this.width,r=this.height
var c=document.getElementById("canvas")
c.width=t,c.height=r
var n=c.getContext("2d")
n.drawImage(a,0,0),a.style.display="none"
for(var l=d3.select("body").append("svg").attr("width",2*t*e).attr("height",2*r*e),s={},o={},d=0;r>d;d++)for(var u=0;t>u;u++){startx=2*e*u+e,starty=2*e*d+e
var g=n.getImageData(u,d,1,1),f=g.data,h="rgba("+f[0]+","+f[1]+","+f[2]+","+f[3]+")",y=i(0,4)
0==y?l.append("circle").attr("cx",startx).attr("cy",starty).attr("r",e).attr("fill","white").attr("id",d.toString()+"_"+u.toString()).attr("class","up"):1==y?l.append("circle").attr("cx",startx).attr("cy",starty).attr("r",e).attr("fill","white").attr("id",d.toString()+"_"+u.toString()).attr("class","down"):2==y?l.append("circle").attr("cx",startx).attr("cy",starty).attr("r",e).attr("fill","white").attr("id",d.toString()+"_"+u.toString()).attr("class","left"):3==y&&l.append("circle").attr("cx",startx).attr("cy",starty).attr("r",e).attr("fill","white").attr("id",d.toString()+"_"+u.toString()).attr("class","right"),s[d.toString()+"_"+u.toString()]=h,o[d.toString()+"_"+u.toString()]={color:h,cx:startx,cy:starty}}var v=function(){d3.selectAll("circle").attr("fill","white")},x=function(t,r){var i=_.sample(Object.keys(t),r)
if(console.log(Object.keys(t).length),console.log(i),0===i.length)return 1
for(var a=0;a<i.length;a++){var c=i[a]
d3.select("circle[id='"+c+"']").transition().attr("fill",s[c]).duration(500),delete t[c]}}
$("#rain").click(function(){d3.selectAll("circle").attr("cy",0).attr("fill",function(){var t=d3.select(this).attr("id")
return o[t].color}).transition().attr("cy",function(){var t=d3.select(this).attr("id")
return o[t].cy}).ease("bounce").duration(1e3)}),$("#sunrise").click(function(){d3.selectAll("circle").attr("cy",2*r*e).attr("fill",function(){var t=d3.select(this).attr("id")
return o[t].color}).transition().attr("cy",function(){var t=d3.select(this).attr("id")
return o[t].cy}).duration(1500)}),$("#four_dir").click(function(){var i=2e3
d3.selectAll("circle[class='up']").attr("cy",0).attr("fill",function(){var t=d3.select(this).attr("id")
return o[t].color}).transition().attr("cy",function(){var t=d3.select(this).attr("id")
return o[t].cy}).duration(i),d3.selectAll("circle[class='left']").attr("cx",0).attr("fill",function(){var t=d3.select(this).attr("id")
return o[t].color}).transition().attr("cx",function(){var t=d3.select(this).attr("id")
return o[t].cx}).duration(i),d3.selectAll("circle[class='down']").attr("cy",2*r*e).attr("fill",function(){var t=d3.select(this).attr("id")
return o[t].color}).transition().attr("cy",function(){var t=d3.select(this).attr("id")
return o[t].cy}).duration(i),d3.selectAll("circle[class='right']").attr("cx",2*t*e).attr("fill",function(){var t=d3.select(this).attr("id")
return o[t].color}).transition().attr("cx",function(){var t=d3.select(this).attr("id")
return o[t].cx}).duration(i)}),$("#painting").click(function(){var t=jQuery.extend({},s)
v(),setInterval(x,10,t,500)})
var p=i(0,4)
0==p?$("#rain").trigger("click"):1==p?$("#sunrise").trigger("click"):2==p?$("#four_dir").trigger("click"):3==p&&$("#painting").trigger("click")}})
