(()=>{"use strict";class t{constructor(t,e){this.size=25,this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}}class e extends t{constructor(t,e){super(t,e),this.color="#0f0"}getColor(){return this.color}}var s;!function(t){t.Up="Up",t.Down="Down",t.Left="Left",t.Right="Right"}(s||(s={}));const i=s,o=document.getElementById("game"),h=o.getContext("2d"),g=[new e(o.width/2,o.height/2)],n=new class extends t{constructor(t,e){super(t,e),this.color="#f00"}getColor(){return this.color}newRandomPosition(t,e){do{this.x=Math.round(Math.random()*(t/this.size))*this.size,this.y=Math.round(Math.random()*(e/this.size))*this.size}while(this.getY()>e-this.size||this.getY()<this.size||this.getX()>t-this.size||this.getX()<this.size)}}(g[0].getX(),g[0].getY()),r=g[0].size;let a=null;for(n.newRandomPosition(o.width,o.height);n.getX()===g[0].getX()||n.getY()===g[0].getY();)n.newRandomPosition(o.width,o.height);const l=()=>{h.strokeStyle="#ffffffa8",h.beginPath(),h.moveTo(0,0);for(let t=0;t<o.width/r;t++)h.moveTo(t*r,0),h.lineTo(t*r,o.height);for(let t=0;t<o.height/r;t++)h.moveTo(0,t*r),h.lineTo(o.width,t*r);h.stroke()},c=()=>{l(),(()=>{h.clearRect(0,0,o.width,o.height),l();for(const t of g)h.beginPath(),h.fillStyle=t.getColor(),h.fillRect(t.getX(),t.getY(),r,r)})(),h.beginPath(),h.fillStyle=n.getColor(),h.fillRect(n.getX(),n.getY(),r,r),console.table(n)};setInterval((()=>{(()=>{if(a){switch(a){case i.Up:g[0].setY(g[0].getY()-r);break;case i.Down:g[0].setY(g[0].getY()+r);break;case i.Left:g[0].setX(g[0].getX()-r);break;case i.Right:g[0].setX(g[0].getX()+r)}for(let t=1;t<g.length;t++)0!=t&&(g[t].setX(g[t-1].getX()),g[t].setY(g[t-1].getY()))}})(),c(),(()=>{if(g[0].getX()===n.getX()&&g[0].getY()===n.getY()){const t=new e(n.getX(),n.getY());switch(a){case i.Up:t.setY(g[0].getY()-r);break;case i.Down:t.setY(g[0].getY()+r);break;case i.Left:t.setX(g[0].getX()-r);break;case i.Right:t.setX(g[0].getX()+r)}g.push(t),n.newRandomPosition(o.width,o.height)}})(),g[0].getX()!==-r&&g[0].getX()!==o.width&&g[0].getY()!==-r&&g[0].getY()!==o.height||(alert("Game Over"),(()=>{for(g[0].setX(o.width/2),g[0].setY(o.height/2),a=null,n.newRandomPosition(o.width,o.height);n.getX()===g[0].getX()||n.getY()===g[0].getY();)n.newRandomPosition(o.width,o.height)})())}),200),o.addEventListener("load",(()=>{c()})),document.addEventListener("keydown",(t=>{(t=>{const e=t.slice(5,t.length);a=e})(t.key)}))})();