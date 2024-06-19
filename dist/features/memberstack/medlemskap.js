"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/features/memberstack/medlemskap.ts
  window.Webflow ||= [];
  window.Webflow.push(async () => {
    const memberstack = window.$memberstackDom;
    const { data: member } = await memberstack.getCurrentMember();
    if (!member)
      return;
    const { planConnections } = member;
    console.log(planConnections);
    planConnections.forEach((plan) => {
      const {
        planId,
        active,
        payment: { cancelAtDate, nextBillingDate }
      } = plan;
      if (!active)
        return;
      const planEl = document.querySelector(`[memberstack-plan-id=${planId}]`);
      if (!planEl)
        return;
      if (cancelAtDate) {
        planEl.classList.add("is-cancelled-plan");
        const cancelAtDateEl = planEl.querySelector("[memberstack-plan-element=cancel-date]");
        if (!cancelAtDateEl)
          return;
        const cancelAtMs = cancelAtDate * 1e3;
        const cancelAtDateFormatted = formatDate(cancelAtMs);
        cancelAtDateEl.textContent = cancelAtDateFormatted;
      }
      if (nextBillingDate && !cancelAtDate) {
        planEl.classList.add("is-current-plan");
        const nextBillingEl = planEl.querySelector("[memberstack-plan-element=next-billing-date]");
        if (!nextBillingEl)
          return;
        const nextBillingDateMs = nextBillingDate * 1e3;
        const nextBillingDateFormatted = formatDate(nextBillingDateMs);
        nextBillingEl.textContent = nextBillingDateFormatted;
      }
    });
  });
  function formatDate(dateMs) {
    const date = new Date(dateMs);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
})();
//# sourceMappingURL=medlemskap.js.map
