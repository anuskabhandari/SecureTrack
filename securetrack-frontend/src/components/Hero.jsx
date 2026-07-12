import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">

        <h1 className="display-2 fw-bold">
          SecureTrack
        </h1>

       <p
  className="lead fw-semibold mt-4"
  style={{ color: "#f8f9fa" }}
>
  AI-powered Security Incident &<br />
  Vulnerability Management Platform
</p>

        <Link
          to="/register"
          className="btn btn-primary btn-lg mt-4 me-3"
        >
          Get Started
        </Link>

        <a
  href="#features"
  className="btn btn-outline-light btn-lg mt-4"
>
  Learn More
</a>

      </div>
    </section>
  );
}