export default function ToolCard({ icon, label }) {
  return (
    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 flex flex-col items-center">
      <div className="text-2xl text-blue-600 dark:text-blue-400">{icon}</div>
      <p className="text-sm mt-1 dark:text-white">{label}</p>
    </div>
  );
}
