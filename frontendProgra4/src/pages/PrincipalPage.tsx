import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

function PrincipalPage() {
  return (
    <div className="principal-page">
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find your next
            <span className="hero-highlight"> job opportunity</span>
          </h1>
          <p className="hero-description">
            We connect talent with opportunities. Discover job offers that perfectly match your skills and experience.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
            <Link to="/register" className="btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}

export default PrincipalPage
