import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      customer_id,
      job_request_id,
      amount,
      currency = "TZS",
      payment_method,
      provider,
      provider_network,
      description,
    } = body;

    // Validate customer
    if (!customer_id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Validate amount
    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "A valid payment amount is required" },
        { status: 400 }
      );
    }

    // Validate payment method
    if (!payment_method) {
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 400 }
      );
    }

    // Create unique Fundi Universe reference
    const externalReference = `FU-${Date.now()}-${Math.floor(
      Math.random() * 10000
    )}`;

    // Save payment
    const { data, error } = await supabase
      .from("payments")
      .insert([
        {
          customer_id,
          job_request_id: job_request_id || null,
          amount: Number(amount),
          currency,
          payment_method,
          provider: provider || null,
          provider_network: provider_network || null,
          status: "Pending",
          external_reference: externalReference,
          description: description || "Fundi Universe payment",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Payment database error:", error);

      return NextResponse.json(
        {
          error: "Failed to create payment",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Payment created successfully",
        payment: data,
        payment_status: "Pending",
        payhero_connected: false,
        note:
          "PayHero integration will be connected after API credentials and Tanzania payment providers are enabled.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create payment error:", error);

    return NextResponse.json(
      {
        error: "Invalid request",
        details: error.message,
      },
      { status: 500 }
    );
  }
        }
