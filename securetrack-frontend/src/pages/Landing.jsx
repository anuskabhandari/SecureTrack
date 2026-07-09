import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Feature";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import DashboardPreview from "../components/DashboardPreview";

import "../styles/landing.css";

export default function Landing() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/api/dashboard/public/dashboard")
            .then((response) => {

                console.log(response.data);

                setStats(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (

        <>

            <Navbar />

            <Hero />

            <DashboardPreview stats={stats} />

            <Features />

            <CTA />

            <Footer />

        </>

    );

}