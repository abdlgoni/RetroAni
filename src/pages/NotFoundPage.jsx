import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="font-pixel text-6xl text-primary mb-4">404</h1>
      <p className="font-pixel text-xl text-accent mb-8">Page Not Found</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-primary text-white font-pixel text-sm hover:bg-accent hover:text-background transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
