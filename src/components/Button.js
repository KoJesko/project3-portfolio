import React from 'react';

function Button({ href, children, variant = 'primary', onClick, target }) {
  const className = `btn btn-${variant}`;

  const isExternal = href && !href.startsWith('#') && !href.startsWith('/');

  if (href) {
    return (
      <a
        href={href}
        className={className}
        target={target || (isExternal ? '_blank' : undefined)}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export default Button;
