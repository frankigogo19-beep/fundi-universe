
import { NextResponse } from "next/server";

const PAYHERO_API_URL = "https://api.payhero.africa";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      amount,
      currency,
      country,
      method,
      network,
      phone,
      customer,
      requestId,
      redirectUrl,
    } = body;

    // PayHero credentials MUST stay on the server.
    const username = process.env.PAYHERO_API_USERNAME;
    const password = process.env.PAYHERO_API_PASSWORD;

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "PayHero API credentials are not configured. Add PAYHERO_API_USERNAME and PAYHERO_API_PASSWORD to Vercel Environment Variables.",
        },
        { status: 500 }
      );
    }

    // Basic validation
    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid payment amount.",
        },
        { status: 400 }
      );
    }

    if (!currency) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment currency is required.",
        },
        { status: 400 }
      );
    }

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment country is required.",
        },
        { status: 400 }
      );
    }

    if (!method) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment method is required.",
        },
        { status: 400 }
      );
    }

    /*
     * PayHero Global API uses:
     * request_type: "payment" for collections.
     *
     * Card and Mobile Money both use the same
     * /api/global/payments endpoint.
     */

    let transactionChannel = "momo";

    if (method === "Card") {
      transactionChannel = "card";
    }

    if (method === "Mobile Money") {
      transactionChannel = "momo";
    }

    /*
     * IMPORTANT:
     * network/provider information must come from
     * PayHero Discovery for the merchant account.
     *
     * Do NOT invent network_id/provider_id/network_code.
     */

    if (!network) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment network is required. PayHero network details must first be discovered for this account.",
        },
        { status: 400 }
      );
    }

    /*
     * network is expected to contain the information
     * returned by PayHero Discovery.
     *
     * Example:
     * {
     *   provider: "yc",
     *   network_id: "...",
     *   network_name: "Airtel Mobile Money",
     *   network_code: "AIRTEL_TZ",
     *   channel_id: "...",
     *   account_type: "momo"
     * }
     */

    const provider =
      network.provider ||
      network.provider_id ||
      network.providerCode;

    const providerConfig = {
      network_id: network.network_id,
      network_name: network.network_name,
      network_code: network.network_code,
      account_type:
        network.channel_type ||
        network.account_type ||
        (method === "Card" ? "card" : "momo"),
    };

    if (network.channel_id) {
      providerConfig.channel_id = network.channel_id;
    }

    if (!provider) {
      return NextResponse.json(
        {
          success: false,
          message:
            "PayHero provider information is missing from the selected network.",
        },
        { status: 400 }
      );
    }

    if (
      !providerConfig.network_id ||
      !providerConfig.network_name ||
      !providerConfig.network_code
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "PayHero network information is incomplete. Please use the network returned by PayHero Discovery.",
        },
        { status: 400 }
      );
    }

    /*
     * Customer information.
     *
     * For Mobile Money, phone is normally the account
     * being charged.
     */

    const customerData = {
      first_name: customer?.first_name || "Fundi",
      last_name: customer?.last_name || "Universe",
      email: customer?.email || "customer@fundiuniverse.com",
      phone: phone || customer?.phone || "",
      country: country,
    };

    if (!customerData.phone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Customer phone number is required for this payment.",
        },
        { status: 400 }
      );
    }

    /*
     * Unique reference for Fundi Universe.
     */

    const reference = `FU-${requestId || "PAY"}-${Date.now()}`;

    /*
     * Your public website URL.
     *
     * NEXT_PUBLIC_SITE_URL should contain:
     * https://your-domain.com
     */

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://project-f8wn0.vercel.app";

    const finalRedirectUrl =
      redirectUrl || `${siteUrl}/dashboard`;

    /*
     * PayHero requires payment_config for Global Payments.
     */

    const paymentConfig = {
      reference,
      account_number: customerData.phone,
      remark: "Fundi Universe service payment",
      payment_category: "service payment",
      callback_url: `${siteUrl}/api/payments/payhero/webhook`,
      redirect_url: finalRedirectUrl,
    };

    /*
     * Final PayHero request.
     */

    const payHeroPayload = {
      request_type: "payment",
      transaction_channel: transactionChannel,
      provider,
      amount: Number(Number(amount).toFixed(2)),
      currency: String(currency).toUpperCase(),
      country: String(country).toUpperCase(),

      reason: "Fundi Universe service payment",

      customer: customerData,

      provider_config: providerConfig,

      payment_config: paymentConfig,
    };

    /*
     * HTTP Basic Authentication
     */

    const auth = Buffer.from(
      `${username}:${password}`
    ).toString("base64");

    const response = await fetch(
      `${PAYHERO_API_URL}/api/global/payments`,
      {
        method: "POST",

        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payHeroPayload),
      }
    );

    const data = await response.json();

    /*
     * PayHero returned an error.
     */

    if (!response.ok) {
      console.error("PayHero API Error:", data);

      return NextResponse.json(
        {
          success: false,
          message:
            data?.error_message ||
            data?.message ||
            "PayHero payment request failed.",
          payhero: data,
        },
        {
          status: response.status,
        }
      );
    }

    /*
     * Successful request.
     */

    return NextResponse.json({
      success: true,

      message:
        data?.message ||
        "Payment request sent successfully.",

      requestId,

      reference,

      merchantReference:
        data?.merchant_reference || null,

      checkoutRequestId:
        data?.checkout_request_id || null,

      checkoutUrl:
        data?.checkout_url || null,

      status:
        data?.status ||
        data?.success ||
        "pending",

      payhero: data,
    });
  } catch (error) {
    console.error("PayHero route error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Unexpected payment server error.",
      },
      { status: 500 }
    );
  }
}
