import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://shantilalsfoods.com/api/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'buffetLists',
            apiKey: 'ASnnKVf5#ip*wtA/UQtcY?X&)d@[6Y',
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const responseData = await response.json();
        if (responseData.success) {
          setBookings(responseData.data || []);
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reset to first page on search
  };

  const filteredBookings = bookings.filter(booking =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.bdate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.time.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("bookings")

  console.log(bookings)

  const paginatedData = filteredBookings.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="container mt-5">
      <div className="search-container">
        <input
          type="search"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <h5 className="text-center">List of Buffet Booking</h5>

      <div className="table-container">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Date</th>
              <th scope="col">Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((booking, index) => (
              <tr key={booking.id}>
                <th scope="row">{currentPage * itemsPerPage + index + 1}</th>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.bdate}</td>
                <td>{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(filteredBookings.length / itemsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default BookingList;
