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

  if (!professional?.id) {
    setError("Professional information is unavailable.");
    setSending(false);
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setError("Please login before sending a service request.");
    setSending(false);
    return;
  }

  if (!professional.user_id) {
    setError("This professional account is not connected correctly.");
    setSending(false);
    return;
  }

  const { data: requestData, error: insertError } = await supabase
    .from("job_requests")
    .insert([
      {
        customer_id: user.id,
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
    ])
    .select("id")
    .single();

  if (insertError) {
    console.error(insertError);

    setError(
      "Unable to send the service request. Please try again."
    );

    setSending(false);
    return;
  }

  const { error: notificationError } = await supabase
    .from("notifications")
    .insert([
      {
        user_id: professional.user_id,
        title: "New Service Request",
        message: `You received a new service request: ${form.title.trim()}`,
        type: "job_request",
        related_request_id: requestData.id,
        is_read: false,
      },
    ]);

  if (notificationError) {
    console.error(notificationError);
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

  setShowRequestForm(false);
  setSending(false);
}
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

  if (!professional?.id) {
    setError("Professional information is unavailable.");
    setSending(false);
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setError("Please login before sending a service request.");
    setSending(false);
    return;
  }

  const { error: insertError } = await supabase
    .from("job_requests")
    .insert([
      {
        customer_id: user.id,
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

  setShowRequestForm(false);
  setSending(false);
      }
