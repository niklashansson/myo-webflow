"use strict";(()=>{window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{window.$memberstackDom.getCurrentMember().then(t=>{if(t.data){let a=t.data.planConnections[0].payment.priceId;if(!a)return;document.querySelectorAll(".membership_item a").forEach(e=>{if(e.getAttribute("data-ms-price:update")===a){e.classList.add("is-active-plan"),e.textContent="Din nuvarande plan",e.removeAttribute("data-ms-price:update");let n=e.closest(".membership_item");if(!n)return;n.classList.add("is-current-plan")}})}})});})();