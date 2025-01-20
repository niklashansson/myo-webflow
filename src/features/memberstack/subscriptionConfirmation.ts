window.Webflow ||= [];
window.Webflow.push(async () => {
  const planTitleEl = document.querySelector('[data-element="plan-title"]');
  if (!planTitleEl) redirect();

  const plans = [
    { planId: 'pln_myo-membership-monthly-c6da07cx', title: 'MYO Medlemskap - Månadsvis' },
    { planId: 'pln_myo-membership-yearly-a66l0ayp', title: 'MYO Medlemskap - Årsvis' },
    { planId: 'pln_myo-medlemskap-kampanj-un900if3', title: 'MYO Medlemskap - 3 Months' },
  ];

  // @ts-expect-error "memberstack"
  const memberstack = window.$memberstackDom;

  const { data: member } = await memberstack.getCurrentMember();
  if (!member) redirect();

  const { planConnections } = member;
  if (!planConnections.length) redirect();

  planConnections.forEach((planConnection: { planId: string }) => {
    const plan = plans.find((p) => p.planId === planConnection.planId);
    if (!plan) redirect();

    if (planTitleEl && plan?.title) {
      planTitleEl.textContent = plan.title;
    }
  });
});

function redirect() {
  window.location.replace('/bli-medlem');
}
