/* eslint-disable @typescript-eslint/no-explicit-any */

import type { GetCurrentMemberPayload } from '@memberstack/dom';

// @ts-expect-error "Data Layer"
window.dataLayer = window.dataLayer || [];
window.Webflow ||= [];

window.Webflow.push(() => {
  window.addEventListener('load', init);
});

function init() {
  const { priceId, isFromCheckout } = parseUrl();
  if (!priceId || !isFromCheckout) {
    redirect();
    return;
  }

  const memberData = getMemberData() as GetCurrentMemberPayload['data'] | undefined;
  if (!memberData) return redirect();

  const successPlan = memberData.planConnections.find(
    (plan) =>
      plan.active &&
      plan.payment?.priceId === priceId &&
      plan.payment.status === 'PAID' &&
      !plan.payment.cancelAtDate &&
      plan?.payment?.lastBillingDate &&
      verifyPlan(plan?.payment?.lastBillingDate as unknown as string)
  );
  if (!successPlan) return redirect();

  pushToDataLayer(memberData, successPlan.planId);
}

function verifyPlan(timestamp: string) {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  return currentTimestamp - Number(timestamp) < 0.5 * 60;
}

function redirect() {
  window.location.href = '/';
}

function parseUrl() {
  const url = new URL(window.location.href);

  const isFromCheckout = url.searchParams.get('fromCheckout');
  const priceId = url.searchParams.get('msPriceId');
  return {
    priceId,
    isFromCheckout,
  };
}

function getMemberData() {
  const data = localStorage.getItem('_ms-mem');
  return data ? JSON.parse(data) : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function pushToDataLayer(
  memberData: GetCurrentMemberPayload['data'] & {
    customFields: { ['first-name']?: string; ['last-name']?: string; ['location']?: string };
  },
  planId: string
) {
  const event = JSON.stringify({
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
  });

  // @ts-expect-error "data layer"
  window.dataLayer.push(event);

  return event;
}