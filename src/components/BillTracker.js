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
      'To find the minors, the device or OS has to assess everyone. That pushes toward ID or biometric checks for all users, not just kids, just to use your own hardware.',
    severity: 'Critical',
  },
  {
    issue: 'Privacy & Surveillance',
    description:
      'Baking age detection and an age-signal API into the OS gives every app a way to ask your device how old you are, whenever it wants. Even if the age data itself gets "promptly deleted" after each check, that asking channel sticks around. It’s the channel itself, not the deleted data, that creates the surveillance risk.',
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
            ⚠️ <strong>Important:</strong> As a FOSS and digital-rights advocate, I&apos;m tracking these NY bills.
            Both would mandate device- and OS-level age verification, which raises privacy and surveillance concerns
            for <em>all</em> users (not just minors) and creates a compliance headache for open-source operating
            systems.
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
            Both bills push age verification down to the device and operating-system layer. That kind of
            identity-checking infrastructure costs something: less privacy, less user autonomy, and a much harder
            compliance bar for anyone running open-source software.
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
            <li>Contact your NY State Assembly member and Senator and tell them why device-level age verification worries you.</li>
            <li>Support the groups already fighting this fight: EFF, ACLU, Software Freedom Conservancy.</li>
            <li>Point out that this affects everyone&apos;s privacy, not just minors.</li>
            <li>Ask how compliance would even work for Linux, alternative OSes, and independent device makers, because nobody sponsoring these bills has a good answer.</li>
            <li>Push for privacy-preserving age assurance instead of mandatory ID or biometric checks.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BillTracker;
