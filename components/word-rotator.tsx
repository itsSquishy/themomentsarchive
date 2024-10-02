"use client"
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const WordRotator = () => {
  return (
    <div className="text-customTeal font-bold">
      <TypeAnimation
        sequence={[
          'events', // Will display 'events'
          3000, // Wait 3 seconds
          'weddings', // Will display 'weddings'
          3000,
          'parties', // Will display 'parties'
          3000,
          'corporate events', // Will display 'corporate events'
          3000,
          'baby showers', // Will display 'baby showers'
          3000,
        ]}
        wrapper="span"
        speed={60}
        cursor={true} // Show blinking cursor
        repeat={Infinity} // Loop indefinitely
      />
    </div>
  );
};

export default WordRotator;
