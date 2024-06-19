/* eslint-disable @typescript-eslint/no-explicit-any */
window.Webflow ||= [];
window.Webflow.push(async () => {
  // @ts-expect-error "memberstack"
  const memberstack = window.$memberstackDom;

  const { data: member } = await memberstack.getCurrentMember();

  if (!member) return;

  const { planConnections } = member;

  planConnections.forEach((plan: any) => {
    const {
      planId,
      active,
      payment: { cancelAtDate, nextBillingDate },
    } = plan;

    // plan not active
    if (!active) return;

    // plan active
    const planEl = document.querySelector(`[memberstack-plan-id=${planId}]`);
    if (!planEl) return;

    // plan cancelled
    if (cancelAtDate) {
      planEl.classList.add('is-cancelled-plan');

      const cancelAtDateEl = planEl.querySelector('[memberstack-plan-element=cancel-date]');
      if (!cancelAtDateEl) return;

      const cancelAtMs = cancelAtDate * 1000;
      const cancelAtDateFormatted = formatDate(cancelAtMs);

      cancelAtDateEl.textContent = cancelAtDateFormatted;
    }

    // active
    if (nextBillingDate && !cancelAtDate) {
      planEl.classList.add('is-current-plan');

      const nextBillingEl = planEl.querySelector('[memberstack-plan-element=next-billing-date]');
      if (!nextBillingEl) return;

      const nextBillingDateMs = nextBillingDate * 1000;
      const nextBillingDateFormatted = formatDate(nextBillingDateMs);

      nextBillingEl.textContent = nextBillingDateFormatted;
    }
  });
});

function formatDate(dateMs: number) {
  const date = new Date(dateMs);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
