import { Link } from 'react-router-dom';

export default function AlgorithmCard({ title, path, description }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-300 mb-4">{description}</p>
      <Link to={path} className="bg-blue-500 px-4 py-2 rounded inline-block text-white">
        Visualize
      </Link>
    </div>
  );
}
