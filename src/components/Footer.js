import React from 'react';

function Footer() {
  return (
    <footer className="footer sticky-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Ari Kotler. Built with React.</p>
        <a className="footer-top" href="#hero">Back to top</a>
      </div>
    </footer>
  );
}

export default Footer;
