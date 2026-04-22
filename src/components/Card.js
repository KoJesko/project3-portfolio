import React from 'react';

function Card({ title, subtitle, children, className = '' }) {
  const isTitleHTML = typeof title === 'string' && title.includes('<');

  return (
    <div className={`card ${className}`.trim()}>
      {title && (
        <h3 className="card-title" dangerouslySetInnerHTML={isTitleHTML ? { __html: title } : undefined}>
          {!isTitleHTML && title}
        </h3>
      )}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
