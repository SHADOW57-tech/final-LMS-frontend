import { useState, useMemo } from "react";
import logoImage from "../../Images/School Logo.png";
import backgroundImage from "../../Images/Background.png";

// Mock data for demonstration
const mockBooks = [
  { id: 1, title: "100 ways to die", author: "Author A", available: 4 },
  { id: 2, title: "5 ways to bury a body", author: "Author B", available: 4 },
  { id: 3, title: "A lorem ipsum dolor sit amet.", author: "Author C", available: 4 },
  { id: 4, title: "B lorem ipsum dolor sit amet.", author: "Author D", available: 4 },
  { id: 5, title: "C lorem ipsum dolor sit amet.", author: "Author E", available: 4 },
];

export default function BookSearchPage() {
  const [query, setQuery] = useState("");
  const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    return mockBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Group books by their first letter
  const groupedBooks = useMemo(() => {
    const groups = {};
    filteredBooks.forEach((book) => {
      const firstChar = book.title.charAt(0).toUpperCase();
      const key = /[0-9]/.test(firstChar) ? "#" : firstChar;
      if (!groups[key]) groups[key] = [];
      groups[key].push(book);
    });
    return groups;
  }, [filteredBooks]);

  return (
    <div className="min-h-screen bg-[#00E5FF] font-sans">
      {/* --- Header with Background --- */}
      <div 
        className="relative bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/80 to-blue-500/30 backdrop-blur-sm"></div>
        
        <div className="relative z-10 p-6">
          <button className="text-white mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo Image */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-900 overflow-hidden">
                <img 
                  src={logoImage}
                  alt="Lead City University Logo"
                  className="w-full h-full object-contain p-1" 
                />
              </div>
              <h1 className="text-4xl font-extrabold text-black tracking-tight">Books</h1>
            </div>

            {/* Search Bar Pill */}
            <div className="relative flex-1 max-w-50 ml-4">
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/70 backdrop-blur-md py-2.5 px-10 rounded-full text-sm placeholder-gray-500 focus:outline-none shadow-inner text-black"
              />
              <svg className="absolute left-3 top-3 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7-0 11-14 0 7 7-0 0114 0z" /></svg>
              <svg className="absolute right-3 top-3 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* --- Alphabet Navigation Strip --- */}
      <div className="flex items-center overflow-x-auto py-4 px-4 no-scrollbar whitespace-nowrap">
        {alphabet.map((char) => (
          <div key={char} className="flex items-center">
            <span className="px-3 text-3xl font-light text-black hover:font-bold cursor-pointer transition-all">
              {char}
            </span>
            <div className="h-8 w-0.5 bg-yellow-400 mx-1"></div>
          </div>
        ))}
      </div>

      {/* --- Grouped Results --- */}
      <div className="px-4 pb-12">
        {Object.keys(groupedBooks).length > 0 ? (
          Object.keys(groupedBooks).sort().map((letter) => (
            <div key={letter} className="mb-8">
              <h2 className="text-5xl font-bold text-white/80 px-2 mb-2">{letter}</h2>
              
              {groupedBooks[letter].map((book) => (
                <div 
                  key={book.id} 
                  className="flex justify-between items-end py-5 border-b border-gray-400/40 px-2"
                >
                  <h3 className="text-xl font-bold text-red-900 underline decoration-red-900 underline-offset-4 cursor-pointer">
                    {book.title}
                  </h3>
                  <p className="text-sm font-bold text-black italic">
                    Available ({book.available})
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center mt-20 text-black/50 font-medium">No results found</div>
        )}
      </div>
    </div>
  );
}