'use client'
import { useEffect, useState } from 'react';
import quotes from '@/components/quotes.json'; // Adjust the path as necessary

const Quotes = () => {
    const [randomQuote, setRandomQuote] = useState({ quote: '', author: '' });

    useEffect(() => {
        // Function to select a random quote
        const getRandomQuote = () => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setRandomQuote(quotes[randomIndex]);
        };

        getRandomQuote();
    }, []);

    return (
        <blockquote className="space-y-2 text-background w-3/4 xl:w-1/2">
            <p className="text-lg">&ldquo;{randomQuote.quote}&rdquo;</p>
            <footer className="text-sm">– {randomQuote.author}</footer>
        </blockquote>
    );
};

export default Quotes;
