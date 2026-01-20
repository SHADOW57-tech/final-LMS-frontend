import { useParams, useNavigate } from "react-router-dom";
import Books from "../../mockdata/Books";
import { useState } from "react";
import Logo from "../../Images/book_details_logo.png";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = Books.find((b) => b.id === parseInt(id));

    // Placeholder function for borrow action
    const [isBorrowed, setIsBorrowed] = useState(false);

    const handleBorrow = () => {
        if (book.available && !isBorrowed) {
            setIsBorrowed(true);
            alert(`You have borrowed "${book.title}"`);
        }
    };

    if (!book) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Book Not Found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden font-sans">
            {/* Background Decorative Elements for "Rich Aesthetics" */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-2000"></div>

            {/* Header / Nav Placeholder (Assuming a Layout wrapper usually handles this, but adding a back button for context) */}
            <div className="relative z-10 px-6 py-4 md:px-12 flex justify-between items-center">
                <h1 className="text-3xl md:text-4xl font-serif text-gray-800 tracking-tight">
                    Book Details
                </h1>
                <div className="flex items-center gap-2">
                    <div className="w-20 h-20 rounded-full shadow-md flex items-center justify-center overflow-hidden border border-gray-200">
                        <img src={Logo} alt="LCU Logo" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <main className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row transition-all duration-300 hover:shadow-3xl">

                    {/* Left Side: Book Cover */}
                    <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />

                        {/* Book Cover Mockup */}
                        <div className="relative w-48 h-72 md:w-56 md:h-80 bg-blue-900 rounded-r-md rounded-l-sm shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-105 flex flex-col overflow-hidden border-l-4 border-white/10">
                            {/* Spine Effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-white/20 to-transparent z-20"></div>

                            {/* Cover Content */}
                            <div className="flex-1 bg-gradient-to-br from-[#1e3a8a] to-[#172554] p-4 flex flex-col text-white relative">
                                {/* Decorative Lines */}
                                <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                                <h2 className="text-2xl font-serif font-bold leading-tight mt-4 z-10 drop-shadow-md">
                                    {book.title}
                                </h2>
                                <p className="text-sm mt-2 opacity-90 font-medium uppercase tracking-wider z-10">
                                    {book.author}
                                </p>

                                <div className="mt-auto z-10">
                                    <p className="text-xs opacity-75">Third Edition</p>
                                </div>
                            </div>
                        </div>
                        {/* Shadow below book */}
                        <div className="absolute bottom-10 w-48 h-4 bg-black/20 blur-xl rounded-full transform scale-x-75 translate-y-4"></div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-4 leading-tight">
                            {book.title}
                        </h2>

                        <div className="space-y-6 text-gray-600 text-lg">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-gray-100 pb-4">
                                <span className="font-semibold text-gray-400 text-sm uppercase tracking-wider min-w-[100px]">Author:</span>
                                <span className="font-medium text-gray-800">{book.author}</span>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 border-b border-gray-100 pb-4">
                                <span className="font-semibold text-gray-400 text-sm uppercase tracking-wider min-w-[100px]">Serial No:</span>
                                <span className="font-mono text-gray-700">LIB-{10000 + book.id}</span>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-2 pb-2">
                                <span className="font-semibold text-gray-400 text-sm uppercase tracking-wider min-w-[100px]">Status:</span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${book.available
                                    ? "bg-green-100 text-green-800 ring-1 ring-green-600/20"
                                    : "bg-red-100 text-red-800 ring-1 ring-red-600/20"
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${book.available ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                    {book.available ? "Available" : "Borrowed"}
                                </span>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleBorrow}
                                disabled={!book.available || isBorrowed}
                                className={`flex-1 px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${book.available && !isBorrowed
                                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:-translate-y-0.5 hover:shadow-blue-500/30 ring-blue-500"
                                    : "bg-gray-400 cursor-not-allowed shadow-none"
                                    }`}
                            >
                                {isBorrowed ? "Borrowed Successfully" : (book.available ? "Borrow Book" : "Not Available")}
                            </button>
                        </div>

                        {/* Status indicators like in the design */}
                        <div className="mt-8 flex gap-3 opacity-50">
                            <div className="h-2 w-12 bg-gray-300 rounded-full"></div>
                            <div className="h-2 w-8 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookDetails;
