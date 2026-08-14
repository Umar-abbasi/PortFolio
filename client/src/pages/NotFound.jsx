import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-header">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h1 className="section-title">404</h1>
        <p className="section-sub" style={{ margin: '0 auto 30px' }}>Page not found.</p>
        <Link to="/" className="btn btn-primary">Back Home →</Link>
      </div>
    </section>
  );
}
