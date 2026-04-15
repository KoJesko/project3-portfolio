import React from 'react';

function Button({ href, children, variant = 'primary', onClick }) {
  const className = `btn btn-${variant}`;

  const isExternal = href && !href.startsWith('#') && !href.startsWith('/');

  if (href) {
    return (
      <a
        href={href}
        className={className}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
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
