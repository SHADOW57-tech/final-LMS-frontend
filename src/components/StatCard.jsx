const StatCard = ({ title, value }) => {
  return (
    <div className="bg-blue-500 text-white rounded-xl p-4 shadow">
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default StatCard;
