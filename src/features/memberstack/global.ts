// MAKE FREE TRIAL OR TIME LIMITED PLAN EXPIRE AFTER SET TIME
/* eslint-disable @typescript-eslint/no-explicit-any */
window.Webflow ||= [];
window.Webflow.push(async () => {
  const freePlans = {
    trialPlan: {
      id: 'pln_myo-membership-trial-plan-846g0a3q',
    },
  };

  // @ts-expect-error "memberstack"
  const memberstack = window.$memberstackDom;

  // Fetch the member's data
  const member = await memberstack.getMemberJSON();

  // Fetch the member's planConnections from local storage
  const memberDataFromLocalStorage = JSON.parse(localStorage.getItem('_ms-mem') ?? '');
  const { planConnections } = memberDataFromLocalStorage;

  if (!planConnections.length) return;

  const planConnection = planConnections[0];

  if (planConnection.planId === freePlans.trialPlan.id && planConnection.status === 'ACTIVE')
    handleTrialPlan(member);

  function handleTrialPlan(member: { data: { [x: string]: string | number | Date } }) {
    // Check the members free-trial-date
    const currentDate = new Date();
    const oneTimeDate = new Date(member.data['free-trial-date']);

    if (currentDate > oneTimeDate) {
      // If the members' one time date has passed, remove x plan
      memberstack
        .removePlan({
          planId: freePlans.trialPlan.id,
        })
        .then(() => {
          // Redirect to /free-trial-expired
          window.location.href = '/medlemskap';
        })
        .catch(() => {
          // Handle error
          window.location.href = '/medlemskap';
        });
    }
  }
});
