import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const item = props.item;

  const imageSrc =
    item.image?.[0]?.startsWith("http")
      ? item.image[0]
      : `/images/${item.image?.[0]}`;

  return (
    <div className="bg-green-50 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 w-72 h-[420px] m-4 flex flex-col">

      {/* Product Image */}
      <div className="w-full h-36 bg-white flex items-center justify-center">
        <img
          src={imageSrc}
          alt={item.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {item.category}
        </p>

        <h2 className="text-md font-semibold text-gray-800 line-clamp-2">
          {item.name}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>

        <p className="text-xs text-gray-500">
          Size: {item.dimensions}
        </p>

        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-blue-600">
            Rs. {item.price}
          </span>

          {item.availability ? (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              Available
            </span>
          ) : (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-200">
          <Link
            to={`/product/${item.key}`}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold tracking-wide shadow hover:shadow-lg">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}