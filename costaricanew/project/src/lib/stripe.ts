import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export { stripePromise };

export const createCheckoutSession = async (priceId: string, userId: string) => {
  const response = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
};

export const exportPremiumData = async (data: any[], format: 'csv' | 'json' | 'pdf') => {
  const response = await fetch('/api/export/premium', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
      format,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to export data');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `alajuelita-analytics-${Date.now()}.${format}`;
  a.click();
  window.URL.revokeObjectURL(url);
};