import { useEffect, useState } from "react";

const MAX_CHARS = 200;

const subjects = [
  { id: 1, name: "Biology", dueDate: "2026-01-19T23:59:00" },
  { id: 2, name: "Mathematics", dueDate: "2026-01-22T18:00:00" },
  { id: 3, name: "Chemistry", dueDate: "2026-01-25T12:00:00" },
];

const MessageCard = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [countdown, setCountdown] = useState("");

  const isDisabled = message.trim().length === 0 || loading;

  /* ⏱ COUNTDOWN */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const due = new Date(selectedSubject.dueDate);
      const diff = due - now;

      if (diff <= 0) {
        setCountdown("Overdue");
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);

      setCountdown(`${d}d ${h}h ${m}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSubject]);

  /* ⏰ REMINDER */
  useEffect(() => {
    const now = new Date();
    const due = new Date(selectedSubject.dueDate);
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      console.log(`📧 Reminder: ${selectedSubject.name} due tomorrow`);
    }
  }, [selectedSubject]);

  const sendMessage = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    alert("Message sent!");
    setMessage("");
    setLoading(false);
  };

  const addToCalendar = () => {
    const start = new Date(selectedSubject.dueDate)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");

    window.open(
      `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        selectedSubject.name + " Submission"
      )}&dates=${start}/${start}&details=Assignment due`,
      "_blank"
    );
  };

  return (
    <div
      className={`min-h-screen px-3 sm:px-6 flex items-center justify-center transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-full max-w-sm sm:max-w-md rounded-2xl shadow-xl transition-colors ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } p-4 sm:p-5`}
      >
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-3">
          <select
            className="text-xs sm:text-sm p-1 rounded border bg-transparent"
            onChange={(e) =>
              setSelectedSubject(
                subjects.find((s) => s.id === Number(e.target.value))
              )
            }
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs sm:text-sm opacity-70"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src="../../public/face.png"
            alt="avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-sm sm:text-base">
              Barbecue Seint
            </h2>
            <p className="text-xs sm:text-sm text-orange-500">
              {selectedSubject.name} • {countdown}
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden mb-3">
          <img
            src="../../public/image.jpeg"
            alt="profile"
            className="w-full h-40 sm:h-48 md:h-52 object-cover"
          />
        </div>

        {/* CALENDAR */}
        <button
          onClick={addToCalendar}
          className="text-xs underline opacity-80 mb-3"
        >
          📅 Add to Calendar
        </button>

        {/* TABS */}
        <div className="relative flex bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-black transition-transform duration-300 ${
              activeTab === "sms" ? "translate-x-full" : ""
            }`}
          />

          {["email", "sms"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 flex-1 py-2 text-xs sm:text-sm font-medium ${
                activeTab === tab ? "text-white" : "text-gray-600"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* MESSAGE */}
        <textarea
          value={message}
          onChange={(e) =>
            e.target.value.length <= MAX_CHARS &&
            setMessage(e.target.value)
          }
          placeholder={`Type your ${activeTab} message`}
          className="w-full h-24 border rounded-lg p-2 sm:p-3 text-white text-xs sm:text-sm resize-none mb-1 dark:bg-gray-700"
        />

        <div className="text-right text-xs opacity-60 mb-3 text-white">
          {message.length}/{MAX_CHARS}
        </div>

        {/* SEND */}
        <button
          onClick={sendMessage}
          disabled={isDisabled}
          className={`w-full py-2.5 sm:py-3 rounded-full font-semibold transition text-sm ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
