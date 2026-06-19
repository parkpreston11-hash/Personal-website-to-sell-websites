exports.handler = async (event) => {
  const headers = { "Content-Type": "application/json" };

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Stripe is not configured. Add STRIPE_SECRET_KEY to your Netlify environment variables." }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const { amount, productName, customerEmail, customerName, origin } = body;

  if (!amount || !productName || !origin) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields: amount, productName, origin" }) };
  }

  const unitAmount = Math.round(Number(amount) * 100);
  if (isNaN(unitAmount) || unitAmount < 50) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid amount" }) };
  }

  const params = new URLSearchParams();
  params.append("mode", "payment");
  params.append("payment_method_types[]", "card");
  params.append("line_items[0][price_data][currency]", "usd");
  params.append("line_items[0][price_data][unit_amount]", String(unitAmount));
  params.append("line_items[0][price_data][product_data][name]", String(productName));
  params.append("line_items[0][quantity]", "1");
  params.append("success_url", `${origin}/success?session_id={CHECKOUT_SESSION_ID}`);
  params.append("cancel_url", `${origin}/checkout`);

  if (customerEmail) params.append("customer_email", String(customerEmail));
  if (customerName) params.append("metadata[customer_name]", String(customerName));

  let response;
  try {
    response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
  } catch (err) {
    return { statusCode: 502, headers, body: JSON.stringify({ error: "Could not reach Stripe. Please try again." }) };
  }

  const data = await response.json();

  if (!response.ok) {
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify({ error: data.error?.message || "Stripe returned an error. Please try again." }),
    };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ url: data.url }) };
};
