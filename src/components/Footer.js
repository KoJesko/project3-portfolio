import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Ari Kotler. Built with React.</p>
      </div>
    </footer>
  );
}

export default Footer;
