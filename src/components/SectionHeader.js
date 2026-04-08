import React from 'react';

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-divider"></div>
    </div>
  );
}

export default SectionHeader;
