"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

const categories = [
  "Construction",
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Welding",
  "Painting",
  "Mechanic",
  "Cleaning",
  "ICT & Technology",
  "Graphic Design",
  "Photography",
  "Transport",
  "Beauty",
  "Tailoring",
  "Agriculture",
  "Consulting",
  "Other",
];

const currencies = [
  "TZS",
  "USD",
  "GBP",
  "EUR",
  "AED",
  "INR",
  "KES",
  "UGX",
  "RWF",
  "ZAR",
  "NGN",
  "CAD",
  "AUD",
  "JPY",
  "CNY",
];

export default function ProfessionalProfile() {
  const params = useParams();

  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    budget: "",
    currency: "TZS",
    requested_date: "",
    customer_notes: "",
  });

  useEffect(() => {
    async function loadProfessional() {
      if (!params?.id) return;

      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("professional_profiles")
        .select("*")
        .eq("id", params.id)
        .single();

      if (fetchError) {
        console.error(fetchError);
        setError("Unable to load this professional profile.");
        setProfessional(null);
      } else {
        setProfessional(data);

        setForm((previous) => ({
          ...previous,
          category: data.professional_category || "",
          country: data.country || "",
          city: data.city || "",
          location: data.location || "",
        }));
      }

      setLoading(false);
    }

    loadProfessional();
  }, [params?.id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function submitRequest(event) {
    event.preventDefault();

    setSending(true);
    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Please enter the job title.");
      setSending(false);
      return;
    }

    if (!form.description.trim()) {
      setError("Please describe the job you need.");
      setSending(false);
      return;
    }

    if (!form.country.trim()) {
      setError("Please enter the country.");
      setSending(false);
      return;
    }

    if (!form.city.trim()) {
      setError("Please enter the city.");
      setSending(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("job_requests")
      .insert([
        {
          customer_id: null,
          professional_id: professional.id,
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          country: form.country.trim(),
          city: form.city.trim(),
          location: form.location.trim(),
          budget: form.budget ? Number(form.budget) : null,
          currency: form.currency,
          requested_date: form.requested_date || null,
          status: "Pending",
          customer_notes: form.customer_notes.trim(),
        },
      ]);

    if (insertError) {
      console.error(insertError);
      setError(
        "Unable to send the service request. Please try again."
      );
      setSending(false);
      return;
    }

    setSuccess(
      "Your service request has been sent successfully."
    );

    setForm((previous) => ({
      ...previous,
      title: "",
      description: "",
      budget: "",
      requested_date: "",
      customer_notes: "",
    }));

    setSending(false);
  }

  if (loading) {
    return (
      <main style={styles.container}>
        <div style={styles.mainCard}>
          <p style={styles.loading}>
            Loading professional profile...
          </p>
        </div>
      </main>
    );
  }

  if (error && !professional) {
    return (
      <main style={styles.container}>
        <div style={styles.errorBox}>
          <h2>Profile Not Found</h2>

          <p>
            {error || "This professional profile does not exist."}
          </p>

          <button
            onClick={() => {
              window.location.href = "/professionals";
            }}
            style={styles.backButton}
          >
            Back to Professionals
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.container}>
      <div style={styles.mainCard}>
        <button
