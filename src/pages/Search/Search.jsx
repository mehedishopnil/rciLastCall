import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import ResortCard from '../../components/resortCard/resortCard';

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const { resortData } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filteredIds = queryParams.get('ids')?.split(',') || [];

    const searchResults = resortData.filter(resort => filteredIds.includes(resort._id));
    setSearchData(searchResults);
  }, [resortData, location.search]); // Trigger useEffect when resortData or location.search changes

  return (
    <div className='p-4'>
      <h1 className='text-center text-2xl font-semibold my-2'>
        Search Results Found: {searchData.length}
      </h1>
      {searchData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchData.map((resort) => (
            <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
              <ResortCard resort={resort} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No Results Found</p>
      )}
    </div>
  );
};

export default Search;
