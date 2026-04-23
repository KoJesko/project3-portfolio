import React from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';

const trophies = [
  {
    title: 'The Diverging Windmill',
    easterNote: 'Secret level: highway flow at 97%.',
    description:
      'Independently conceptualized and designed the "diverging windmill" traffic interchange using spatial logic in Cities: Skylines, entirely unaware that professional civil engineers had already drafted the concept. My traffic planning intuition is razor-sharp.',
  },
  {
    title: 'Calculated Risks',
    easterNote: 'Reads the room in 3 hands or less.',
    description:
      'I have been playing poker since I was 7 years old and successfully beat adults on the cable box games channel. I know how to read a room, understand the odds, and execute a winning strategy.',
  },
  {
    title: 'Virtual Operations & Management',
    easterNote: 'Convoy routes optimized, no pileups.',
    description:
      'Handled human resources, server order, and convoy logistics for Prime Logistics VTC, managing real people in a simulated, highly structured environment.',
  },
  {
    title: 'Unchallenged Records',
    easterNote: 'If Moonview appears, the lobby is over.',
    description:
      'For the record, I am the undisputed Moonview Highway god in Mario Kart Wii.',
  },
];

function Pride() {
  return (
    <section id="pride" className="section pride">
      <div className="container">
        <SectionHeader title="The Trophies" subtitle="Points of Pride" />
        <div className="pride-grid">
          {trophies.map((trophy) => (
            <Card key={trophy.title} title={trophy.title} className="interactive-card trophy-card">
              <p>{trophy.description}</p>
              <p className="hover-note">{trophy.easterNote}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pride;
