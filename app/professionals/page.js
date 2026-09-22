"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const categories = [
"All Categories",
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

const countries = [
"All Countries",
"Tanzania",
"Kenya",
"Uganda",
"Rwanda",
"United States",
"United Kingdom",
"United Arab Emirates",
"India",
"South Africa",
"Nigeria",
"Other",
];

export default function ProfessionalsPage() {
const [professionals, setProfessionals] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All Categories");
const [country, setCountry] = useState("All Countries");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
loadProfessionals();
}, []);

async function loadProfessionals() {
setLoading(true);
setError("");

const { data, error } = await supabase .from("professional_profiles") .select("*") .eq("is_active", true) .order("created_at", { ascending: false }); if (error) { console.error(error); setError("Unable to load professionals."); setProfessionals([]); } else { setProfessionals(data || []); } setLoading(false);

}

const filteredProfessionals = professionals.filter((professional) => {
const searchText = search.toLowerCase();

const matchesSearch = !search || professional.full_name?.toLowerCase().includes(searchText) || professional.professional_title?.toLowerCase().includes(searchText) || professional.professional_category?.toLowerCase().includes(searchText) || professional.skills?.toLowerCase().includes(searchText) || professional.location?.toLowerCase().includes(searchText) || professional.city?.toLowerCase().includes(searchText) || professional.country?.toLowerCase().includes(searchText); const matchesCategory = category === "All Categories" || professional.professional_category === category; const matchesCountry = country === "All Countries" || professional.country === country; return matchesSearch && matchesCategory && matchesCountry;

});

return (
<main style={styles.page}>
<div style={styles.container}>
<header style={styles.header}>
<div>
<h1 style={styles.heading}>Find a Professional</h1>
<p style={styles.subtitle}>
Find trusted professionals and skilled service providers
around the world.
</p>
</div>

<Link href="/dashboard" style={styles.dashboardButton}> Dashboard </Link> </header> <section style={styles.filters}> <input type="text" placeholder="Search by name, skill, service or location..." value={search} onChange={(e) => setSearch(e.target.value)} style={styles.searchInput} /> <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select} > {categories.map((item) => ( <option key={item} value={item}> {item} </option> ))} </select> <select value={country} onChange={(e) => setCountry(e.target.value)} style={styles.select} > {countries.map((item) => ( <option key={item} value={item}> {item} </option> ))} </select> </section> {loading && ( <div style={styles.message}> <p>Loading professionals...</p> </div> )} {!loading && error && ( <div style={styles.error}> <p>{error}</p> <button onClick={loadProfessionals} style={styles.retryButton} > Try Again </button> </div> )} {!loading && !error && filteredProfessionals.length === 0 && ( <div style={styles.message}> <h2>No professionals found</h2> <p> Try changing your search, category or country. </p> </div> )} {!loading && !error && filteredProfessionals.length > 0 && ( <section style={styles.grid}> {filteredProfessionals.map((professional) => { const initials = professional.full_name ? professional.full_name .split(" ") .map((name) => name[0]) .join("") .slice(0, 2) .toUpperCase() : "FU"; return ( <article key={professional.id} style={styles.card} > <div style={styles.topSection}> {professional.profile_photo ? ( <img src={professional.profile_photo} alt={ professional.full_name || "Professional" } style={styles.photo} /> ) : ( <div style={styles.initials}> {initials} </div> )} <div style={styles.basicInfo}> <h2 style={styles.name}> {professional.full_name || "Unnamed Professional"} </h2> <p style={styles.title}> {professional.professional_title || "Professional"} </p> <p style={styles.category}> {professional.professional_category || "Other"} </p> </div> </div> <div style={styles.details}> {professional.skills && ( <p> <strong>Skills:</strong>{" "} {professional.skills} </p> )} {(professional.city || professional.country) && ( <p> <strong>Location:</strong>{" "} {professional.city ? `${professional.city}, ` : ""} {professional.country || ""} </p> )} {professional.location && ( <p> <strong>Area:</strong>{" "} {professional.location} </p> )} </div> <Link href={`/professionals/${professional.id}`} style={styles.viewButton} > View Profile </Link> </article> ); })} </section> )} </div> </main>

);
}

const styles = {
page: {
minHeight: "100vh",
background: "#f5f7fb",
padding: "40px 20px",
boxSizing: "border-box",
},

container: {
width: "100%",
maxWidth: "1200px",
margin: "0 auto",
},

header: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
gap: "20px",
marginBottom: "30px",
flexWrap: "wrap",
},

heading: {
margin: 0,
fontSize: "34px",
fontWeight: 800,
},

subtitle: {
marginTop: "8px",
color: "#667085",
fontSize: "16px",
},

dashboardButton: {
textDecoration: "none",
background: "#111827",
color: "#ffffff",
padding: "12px 18px",
borderRadius: "10px",
fontWeight: 700,
},

filters: {
display: "grid",
gridTemplateColumns:
"minmax(220px, 2fr) minmax(180px, 1fr) minmax(180px, 1fr)",
gap: "12px",
marginBottom: "30px",
},

searchInput: {
width: "100%",
padding: "14px",
border: "1px solid #d0d5dd",
borderRadius: "10px",
fontSize: "15px",
boxSizing: "border-box",
background: "#ffffff",
},

select: {
width: "100%",
padding: "14px",
border: "1px solid #d0d5dd",
borderRadius: "10px",
fontSize: "15px",
background: "#ffffff",
boxSizing: "border-box",
},

grid: {
display: "grid",
gridTemplateColumns:
"repeat(auto-fit, minmax(280px, 1fr))",
gap: "20px",
},

card: {
background: "#ffffff",
border: "1px solid #eaecf0",
borderRadius: "16px",
padding: "20px",
boxShadow: "0 4px 15px rgba(16, 24, 40, 0.06)",
},

topSection: {
display: "flex",
alignItems: "center",
gap: "14px",
},

photo: {
width: "70px",
height: "70px",
borderRadius: "50%",
objectFit: "cover",
border: "2px solid #e4e7ec",
},

initials: {
width: "70px",
height: "70px",
borderRadius: "50%",
background: "#e8eefc",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: "22px",
fontWeight: 800,
color: "#344054",
flexShrink: 0,
},

basicInfo: {
minWidth: 0,
},

name: {
margin: 0,
fontSize: "20px",
fontWeight: 800,
overflowWrap: "anywhere",
},

title: {
margin: "5px 0",
color: "#475467",
fontSize: "14px",
},

category: {
margin: 0,
color: "#667085",
fontSize: "13px",
},

details: {
marginTop: "18px",
color: "#475467",
fontSize: "14px",
lineHeight: 1.6,
},

viewButton: {
display: "inline-block",
marginTop: "14px",
textDecoration: "none",
background: "#2563eb",
color: "#ffffff",
padding: "11px 16px",
borderRadius: "9px",
fontWeight: 700,
},

message: {
background: "#ffffff",
borderRadius: "14px",
padding: "40px 20px",
textAlign: "center",
border: "1px solid #eaecf0",
},

error: {
background: "#fff4f4",
color: "#b42318",
border: "1px solid #fecdca",
borderRadius: "14px",
padding: "24px",
textAlign: "center",
},

retryButton: {
border: "none",
background: "#b42318",
color: "#ffffff",
padding: "11px 18px",
borderRadius: "9px",
fontWeight: 700,
cursor: "pointer",
},
};

