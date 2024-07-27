export const SkeletonLoader = () => {
    return (
      <tr className="animate-pulse">
        <td className="p-3">
          <div className="h-6 bg-gray-200 rounded"></div>
        </td>
        <td className="p-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </td>
        <td className="p-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </td>
        <td className="p-3">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </td>
        <td className="p-3">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </td>
        <td className="p-3">
          <div className="h-6 bg-gray-200 rounded w-full"></div>
        </td>
      </tr>
    );
  }
  