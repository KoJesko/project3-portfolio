import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';

const bills = [
  {
    id: 'S8102A',
    name: 'Senate Bill S8102A',
    type: 'Senate',
    description: 'Regulates open-source software licensing and compliance',
    status: 'Pending Review',
    statusColor: '#ff9e4a',
    impact: 'HIGH',
  },
  {
    id: 'AB8803',
    name: 'Assembly Bill AB8803',
    type: 'Assembly',
    description: 'Proposed restrictions on GPL and copyleft licensing',
    status: 'Pending Review',
    statusColor: '#ff9e4a',
    impact: 'HIGH',
  },
];

const implications = [
  {
    issue: 'GPL Restrictions',
    description:
      'Would limit the ability to use and modify GPL-licensed software, which powers Linux development and many critical open-source projects.',
    severity: 'Critical',
  },
  {
    issue: 'Developer Freedom',
    description:
      'Restricts developers from contributing to open-source projects and sharing code improvements across the community.',
    severity: 'Critical',
  },
  {
    issue: 'Linux Ecosystem Threat',
    description:
      'Linux and most development tools rely on GPL and similar copyleft licenses. These bills would effectively criminalize or heavily restrict their use.',
    severity: 'Critical',
  },
  {
    issue: 'Competitive Disadvantage',
    description:
      'Would give proprietary software companies advantages by restricting free/open alternatives, stifling innovation in NY tech.',
    severity: 'High',
  },
  {
    issue: 'Educational Impact',
    description:
      'Computer science education relies on open-source tools and code examples. These restrictions would harm students and learning.',
    severity: 'High',
  },
  {
    issue: 'Community-Driven Development',
    description:
      'Open-source depends on volunteers and community collaboration. These bills would make that illegal or unfeasible.',
    severity: 'Critical',
  },
];

function BillTracker() {
  const [billDetails] = useState(bills);

  useEffect(() => {
    // Fetch bill status from NY Legislature API if available
    const fetchBillStatus = async () => {
      try {
        // Note: This is a public API endpoint that may or may not be available
        // If unavailable, we'll use the static data above
        const response = await fetch('https://api.leginfo.legislature.ca.gov/');
        if (response.ok) {
          // Update would go here if API provides data
        }
      } catch (error) {
        // Silently fail and use static data
        console.log('Bill status API unavailable, using static data');
      }
    };

    fetchBillStatus();
  }, []);

  return (
    <section id="bill-tracker" className="section bill-tracker">
      <div className="container">
        <SectionHeader title="Advocacy & Awareness" subtitle="NY State Bill Tracker" />

        <div className="bill-warning">
          <p>
            ⚠️ <strong>Important:</strong> As a Linux developer and open-source advocate, I'm tracking these bills
            that could significantly impact free and open-source software development.
          </p>
        </div>

        <div className="bills-grid">
          {billDetails.map((bill) => (
            <div key={bill.id} className="bill-card">
              <div className="bill-header">
                <h3>{bill.name}</h3>
                <span className="bill-type">{bill.type}</span>
              </div>
              <p className="bill-description">{bill.description}</p>
              <div className="bill-status">
                <span className="status-label">Status:</span>
                <span className="status-badge" style={{ borderColor: bill.statusColor }}>
                  {bill.status}
                </span>
              </div>
              <div className="bill-impact">
                <span className="impact-label">Impact on Linux/Open-Source:</span>
                <span className={`impact-badge impact-${bill.impact.toLowerCase()}`}>{bill.impact}</span>
              </div>
              <a
                href={`https://www.nysenate.gov/legislation/bills/${bill.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bill-link"
              >
                View Full Bill →
              </a>
            </div>
          ))}
        </div>

        <div className="implications-section">
          <h3>Why These Bills Are Harmful to Linux Development</h3>
          <p className="implications-intro">
            Linux and the open-source ecosystem depend on collaborative development and copyleft licenses like the
            GPL. These bills threaten the very foundation of how Linux and countless critical tools are developed:
          </p>

          <div className="implications-grid">
            {implications.map((impl, index) => (
              <div key={index} className="implication-card">
                <div className="implication-header">
                  <h4>{impl.issue}</h4>
                  <span className={`severity-badge severity-${impl.severity.toLowerCase().replace('/', '-')}`}>
                    {impl.severity}
                  </span>
                </div>
                <p>{impl.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bill-action-section">
          <h3>What You Can Do</h3>
          <ul className="action-list">
            <li>📧 Contact your NY State representatives about the impact on tech innovation</li>
            <li>🤝 Support organizations defending open-source rights (EFF, Software Freedom Conservancy, etc.)</li>
            <li>📢 Spread awareness about how these bills affect developers and the tech community</li>
            <li>💻 Contribute to open-source projects - every contribution strengthens the community</li>
            <li>🔗 Share information about the importance of copyleft licenses for software freedom</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BillTracker;
