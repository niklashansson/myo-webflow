"use strict";(()=>{window.Webflow||(window.Webflow=[]);window.Webflow.push(async()=>{let a=window.$memberstackDom,{data:t}=await a.getCurrentMember();if(!t)return;let{planConnections:c}=t;c.forEach(r=>{let{planId:l,active:u,payment:{cancelAtDate:o,nextBillingDate:m}}=r;if(!u)return;let e=document.querySelector(`[memberstack-plan-id=${l}]`);if(e){if(o){e.classList.add("is-cancelled-plan");let n=e.querySelector("[memberstack-plan-element=cancel-date]");if(!n)return;let s=o*1e3,i=d(s);n.textContent=i}if(m&&!o){e.classList.add("is-current-plan");let n=e.querySelector("[memberstack-plan-element=next-billing-date]");if(!n)return;let s=m*1e3,i=d(s);n.textContent=i}}})});function d(a){let t=new Date(a),c=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${c}-${r}-${l}`}})();
