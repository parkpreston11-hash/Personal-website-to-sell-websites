exports.handler = async (event) => {
  const headers = { "Content-Type": "application/json" };
  const sessionId = event.queryStringParameters?.session_id;

  if (!sessionId) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing session_id parameter" }) };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Stripe is not configured" }) };
  }

  let response;
  try {
    response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
  } catch {
    return { statusCode: 502, headers, body: JSON.stringify({ error: "Could not reach Stripe to verify payment." }) };
  }

  const data = await response.json();

  if (!response.ok) {
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify({ error: data.error?.message || "Could not verify session" }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      paid: data.payment_status === "paid",
      customerEmail: data.customer_email ?? null,
      amountTotal: data.amount_total ?? null,
    }),
  };
};
