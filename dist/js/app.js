(()=>{"use strict";class t{constructor(t,e){this.size=25,this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}}class e extends t{constructor(t,e){super(t,e),this.color="#0f0"}getColor(){return this.color}}var o;!function(t){t.Up="Up",t.Down="Down",t.Left="Left",t.Right="Right"}(o||(o={}));const i=o,s=document.getElementById("game"),n=s.getContext("2d"),g=[new e(s.width/2,s.height/2)],r=new class extends t{constructor(t,e){super(t,e),this.color="#f00"}getColor(){return this.color}newRandomPosition(t,e){do{this.x=Math.round(Math.random()*(t/this.size))*this.size,this.y=Math.round(Math.random()*(e/this.size))*this.size}while(this.getY()>e-this.size||this.getY()<this.size||this.getX()>t-this.size||this.getX()<this.size)}}(g[0].getX(),g[0].getY()),h=g[0].size,l=document.getElementById("score");let c=null;r.newRandomPosition(s.width,s.height);for(const t of g)for(;r.getX()===t.getX()||r.getY()===t.getY();)r.newRandomPosition(s.width,s.height);const a=()=>{n.clearRect(0,0,s.width,s.height)},d=()=>{const t=document.getElementById("record");localStorage.getItem("record")?t.innerText=localStorage.getItem("record"):t.innerText="0"},f=()=>{alert("Fim de jogo!"),(()=>{for(a();1!=g.length;)g.pop();for(g[0].setX(s.width/2),g[0].setY(s.height/2),c=null,r.newRandomPosition(s.width,s.height);r.getX()===g[0].getX()||r.getY()===g[0].getY();)r.newRandomPosition(s.width,s.height);l.innerText="0"})()},w=()=>{a(),(()=>{n.strokeStyle="#ffffffa8",n.beginPath(),n.moveTo(0,0);for(let t=0;t<s.width/h;t++)n.moveTo(t*h,0),n.lineTo(t*h,s.height);for(let t=0;t<s.height/h;t++)n.moveTo(0,t*h),n.lineTo(s.width,t*h);n.stroke()})(),(()=>{n.beginPath();for(const t of g)n.fillStyle=t.getColor(),n.fillRect(t.getX(),t.getY(),h,h)})(),n.beginPath(),n.fillStyle=r.getColor(),n.fillRect(r.getX(),r.getY(),h,h)};setInterval((()=>{(()=>{if(!c)return;let t=g[0].getX(),e=g[0].getY();switch(c){case i.Up:g[0].setY(g[0].getY()-h);break;case i.Down:g[0].setY(g[0].getY()+h);break;case i.Left:g[0].setX(g[0].getX()-h);break;case i.Right:g[0].setX(g[0].getX()+h)}for(let o=1;o<g.length;o++){const i=g[o].getX(),s=g[o].getY();g[o].setX(t),g[o].setY(e),t=i,e=s}})(),w(),(()=>{if(g[0].getX()===r.getX()&&g[0].getY()===r.getY()){const t=g[g.length-1];g.push(new e(t.getX()+h,t.getY()+h)),(()=>{const t=new Audio;t.src="/../../src/assets/eat_sound.mp3",t.play()})(),r.newRandomPosition(s.width,s.height),l.innerText=(parseInt(l.innerText)+1).toString(),(!localStorage.getItem("record")||parseInt(localStorage.getItem("record"))<parseInt(l.innerText))&&localStorage.setItem("record",l.innerText),d()}})(),g[0].getX()!==-h&&g[0].getX()!==s.width&&g[0].getY()!==-h&&g[0].getY()!==s.height||f(),(()=>{for(let t=1;t<g.length;t++)g[0].getX()!==g[t].getX()||g[0].getY()!==g[t].getY()||g[0].getX()===r.getX()&&g[0].getY()===r.getY()||f()})()}),200),w(),d(),document.addEventListener("keydown",(t=>{(t=>{const e=t.slice(5,t.length);(t=>!("Up"===t&&c===i.Down||"Down"===t&&c===i.Up||"Left"===t&&c===i.Right||"Right"===t&&c===i.Left))(e)&&(c=e)})(t.key)}))})();