/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-expect-error "Data Layer"
window.dataLayer = window.dataLayer || [];
window.Webflow ||= [];

window.Webflow.push(async () => {
  // Check url
  const params = new URLSearchParams(window.location.href);
  const fromCheckout = params.get('fromCheckout');
  const msPriceId = params.get('msPriceId');
  if (!fromCheckout || !msPriceId) return;

  // Fetch the member's planConnections from local storage
  const memberDataFromLocalStorage = localStorage.getItem('_ms-mem');
  if (!memberDataFromLocalStorage) return;

  const memberData = JSON.parse(memberDataFromLocalStorage);
  if (!memberData) return;

  const { planConnections } = memberData;
  if (!planConnections.length) return;

  const confirmedPlan = planConnections.find((p: any) => validatePlan(p, msPriceId));
  if (confirmedPlan) {
    pushToDataLayer(memberData, confirmedPlan.planId);
  }
});

function validatePlan(plan: any, urlPriceId: string) {
  if (!plan.payment) return;

  const isActive = plan.active;
  const isValidPriceId = plan.payment.priceId === urlPriceId;
  const isPaid = plan.payment.status === 'PAID';
  const isNotCancelled = !plan.payment.cancelAtDate;
  // const isConfirmedRecently = isRecentPlan(plan.payment.lastBillingDate);

  return isActive && isValidPriceId && isPaid && isNotCancelled;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
async function pushToDataLayer(memberData: any, planId: string) {
  const event = {
    event: 'myo-new-subscription',
    newInstructionsSubscription: {
      memberEmail: memberData.auth.email,
      memberId: memberData.id,
      memberFirstName: memberData.customFields['first-name'],
      memberLastName: memberData.customFields['last-name'],
      memberLocation: memberData.customFields?.location,
      stripeCustomerId: memberData.stripeCustomerId,
      planId,
    },
  };

  // @ts-expect-error "data layer"
  window.dataLayer.push(event);
  console.log('Pushed to data layer!');
}

// function isRecentPlan(timestamp: number) {
//   // Get the current time in seconds since the epoch
//   const currentTime = Math.floor(Date.now() / 1000);

//   // Calculate the difference in seconds
//   const timeDifference = currentTime - timestamp;

//   // Check if the difference is less than or equal to 5 minutes (300 seconds)
//   return timeDifference <= 900;
// }
