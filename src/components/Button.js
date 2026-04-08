import React from 'react';

function Button({ href, children, variant = 'primary', onClick }) {
  const className = `btn btn-${variant}`;

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
