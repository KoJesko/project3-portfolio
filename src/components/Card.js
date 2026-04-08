import React from 'react';

function Card({ title, subtitle, children }) {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
