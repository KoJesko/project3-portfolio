import React from 'react';
import SectionHeader from './SectionHeader';

const bills = [
  {
    id: 'A08893',
    name: 'Assembly Bill A.8893',
    type: 'Assembly',
    description:
      'Sponsored by Asm. Rozic. The "Age Assurance for Internet-Enabled Devices" act would require device manufacturers to detect minor users and broadcast a digital "covered minor" signal to apps, websites, and app stores through an API.',
    status: 'In Assembly Committee',
    statusColor: '#ff9e4a',
    impact: 'HIGH',
    url: 'https://assembly.state.ny.us/leg/?bn=A.8893',
  },
  {
    id: 'S8102B',
    name: 'Senate Bill S.8102-B',
    type: 'Senate',
    description:
      'Sponsored by Sen. Gounardes. Would require operating-system providers to run "commercially reasonable" age assurance at device activation and transmit age-category signals (under 13 / 13–15 / 16–17 / 18+) to apps on request. Enforced by the Attorney General with penalties up to $10,000 per violation.',
    status: 'In Senate Consumer Protection Committee',
    statusColor: '#ff9e4a',
    impact: 'HIGH',
    url: 'https://www.nysenate.gov/legislation/bills/2025/S8102/amendment/B',
  },
];

const implications = [
  {
    issue: 'Universal Age Verification',
    description:
      'To find the minors, the device or OS has to assess everyone. That pushes toward ID or biometric checks for all users — not just kids — to use your own hardware.',
    severity: 'Critical',
  },
  {
    issue: 'Privacy & Surveillance',
    description:
      'Baking age detection and an age-signal API into the operating system creates a persistent, device-level channel that broadcasts a user’s age category to apps. Even "promptly deleted" age data is new surveillance infrastructure.',
    severity: 'Critical',
  },
  {
    issue: 'Burden on Open-Source & Alt OSes',
    description:
      'A "commercially reasonable" age-assurance mandate at the OS layer is trivial for Apple and Google but a heavy or impossible compliance burden for Linux distros, AOSP forks, and small independent operating systems.',
    severity: 'Critical',
  },
  {
    issue: 'Device Autonomy & Right to Repair',
    description:
      'Tying verification to device activation conflicts with users owning and controlling their own hardware, and with the freedom to run the operating system and software you choose.',
    severity: 'High',
  },
  {
    issue: 'Chilling Effect on Access',
    description:
      'Device-level age gating tends to over-block lawful content and discourages anonymous, private access to the internet for everyone, not only minors.',
    severity: 'High',
  },
  {
    issue: 'New Data & Security Risk',
    description:
      'Collecting age and identity signals creates fresh honeypots and attack surface. Age-assurance APIs can leak, be spoofed, or be repurposed for tracking well beyond their stated intent.',
    severity: 'High',
  },
];

function BillTracker() {
  return (
    <section id="bill-tracker" className="section bill-tracker">
      <div className="container">
        <SectionHeader title="Advocacy & Awareness" subtitle="NY State Bill Tracker" />

        <div className="bill-warning">
          <p>
            ⚠️ <strong>Important:</strong> As a FOSS and digital-rights advocate, I&apos;m tracking these NY bills that
            would mandate device- and OS-level age verification &mdash; raising serious privacy, surveillance, and
            open-source concerns for <em>all</em> users, not just minors.
          </p>
        </div>

        <div className="bills-grid">
          {bills.map((bill) => (
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
                <span className="impact-label">Privacy &amp; Digital Rights Impact:</span>
                <span className={`impact-badge impact-${bill.impact.toLowerCase()}`}>{bill.impact}</span>
              </div>
              <a
                href={bill.url}
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
          <h3>Why These Bills Raise Digital-Rights Concerns</h3>
          <p className="implications-intro">
            Both bills push age verification down to the device and operating-system layer. Mandating that level of
            identity-checking infrastructure carries real costs for privacy, user autonomy, and the open-source
            ecosystem:
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
            <li>📧 Contact your NY State Assembly member and Senator to voice concerns about device-level age verification</li>
            <li>🛡️ Support digital-rights groups working on privacy and age-verification policy (EFF, ACLU, Software Freedom Conservancy)</li>
            <li>📢 Raise awareness that mandatory age assurance affects everyone&apos;s privacy, not just minors</li>
            <li>🐧 Ask how compliance would even work for Linux, alternative OSes, and independent device makers</li>
            <li>🔐 Push for privacy-preserving approaches over mandatory identity and biometric checks</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BillTracker;
