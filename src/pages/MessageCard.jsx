import { useEffect, useState } from "react";

const MAX_CHARS = 200;

// 📚 Subjects list (can come from backend)
const subjects = [
  {
    id: 1,
    name: "Biology",
    dueDate: "2026-01-19T23:59:00",
  },
  {
    id: 2,
    name: "Mathematics",
    dueDate: "2026-01-22T18:00:00",
  },
  {
    id: 3,
    name: "Chemistry",
    dueDate: "2026-01-25T12:00:00",
  },
];

const MessageCard = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [countdown, setCountdown] = useState("");

  const isDisabled = message.trim().length === 0 || loading;

  /* ⏱ COUNTDOWN TIMER */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const due = new Date(selectedSubject.dueDate);
      const diff = due - now;

      if (diff <= 0) {
        setCountdown("Overdue");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSubject]);

  /* ⏰ AUTOMATIC REMINDER (1 DAY BEFORE) */
  useEffect(() => {
    const now = new Date();
    const due = new Date(selectedSubject.dueDate);
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      console.log(
        `📧 Reminder Email Sent: ${selectedSubject.name} is due tomorrow`
      );
    }
  }, [selectedSubject]);

  /* 📤 SEND MESSAGE */
  const sendMessage = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log({
      channel: activeTab,
      subject: selectedSubject.name,
      message,
    });

    alert("Message sent successfully!");
    setMessage("");
    setLoading(false);
  };

  /* 📅 CALENDAR INTEGRATION */
  const addToCalendar = () => {
    const start = new Date(selectedSubject.dueDate)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      selectedSubject.name + " Submission"
    )}&dates=${start}/${start}&details=Assignment due`;

    window.open(url, "_blank");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-200"
      }`}
    >
      <div
        className={`w-[380px] rounded-2xl shadow-xl p-4 transition-colors ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* 🌙 DARK MODE */}
        <div className="flex justify-between items-center mb-2">
          <select
            className="text-sm p-1 rounded bg-transparent border"
            onChange={(e) =>
              setSelectedSubject(
                subjects.find((s) => s.id === Number(e.target.value))
              )
            }
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm opacity-70"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src="../../public/face.png"
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="font-semibold">Barbecue Seint</h2>
            <p className="text-sm text-orange-500">
              {selectedSubject.name} • {countdown}
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="rounded-xl overflow-hidden mb-3">
          <img
            src="../../public/image.jpeg"
            alt="profile"
            className="w-full h-56 object-cover"
          />
        </div>

        {/* CALENDAR */}
        <button
          onClick={addToCalendar}
          className="text-xs underline mb-3 opacity-80"
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
              className={`relative z-10 flex-1 py-2 text-sm font-medium ${
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
          className="w-full h-24 border rounded-lg p-3 text-sm resize-none mb-1 dark:bg-gray-700"
        />

        <div className="text-right text-xs opacity-60 mb-3">
          {message.length}/{MAX_CHARS}
        </div>

        {/* SEND */}
        <button
          onClick={sendMessage}
          disabled={isDisabled}
          className={`w-full py-3 rounded-full font-semibold transition ${
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
