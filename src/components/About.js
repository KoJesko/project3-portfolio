import React from 'react';
import SectionHeader from './SectionHeader';

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeader title="About Me" subtitle="The Unfiltered Version" />
        <div className="about-content">
          <p>
            I am a Computer Science Senior at Pace University who believes in owning my
            I am a hardline advocate for Free and Open-Source Software (FOSS)
            and the Right to Repair. I fix my own devices, build custom rigs from the ground up, and configure my
            environments precisely how I want them.
          </p>
          <p>
            I value the traditional, fundamental ways systems are built, but I am always
            looking for the innovative optimization that pushes them forward. When I am
            not compiling code or troubleshooting a Linux kernel, I am likely
            gaming or playing the electric bass.
            I tell it exactly like it is, and I build systems that work.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
