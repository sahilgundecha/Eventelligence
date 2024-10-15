import React, { useContext, useMemo, useState } from 'react';
import { Eye, Copy, Search, Plus } from 'react-feather';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../utils/formContext';
import EventCard from '../../components/EventCard/EventCard';
import FilterSortComponent from '../../components/Select/FilterSortComponent';
import Sort from '../../components/Sort/Sort';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const { events = [], setCurrentEvent } = useContext(FormContext);
  const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const eventStartDate = new Date(startDate);
    const eventEndDate = new Date(endDate);

    if (eventEndDate < now) {
      return 'Past';
    } else if (eventStartDate <= now && eventEndDate >= now) {
      return 'Ongoing';
    } else {
      return 'Upcoming';
    }
  };

  const eventCount = useMemo(() => {
    return events.reduce(
      (acc, item) => {
        const status = getEventStatus(item.startDate, item.endDate);

        if (status === 'Ongoing') {
          return { ...acc, ongoing: acc.ongoing + 1 };
        }

        if (status === 'Past') {
          return { ...acc, past: acc.past + 1 };
        }

        if (status === 'Upcoming') {
          return { ...acc, upcoming: acc.upcoming + 1 };
        }

        return acc; // Always return acc if no condition matches
      },
      { past: 0, upcoming: 0, ongoing: 0 }
    );
  }, [events]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter events based on the search query
  const filteredEvents = useMemo(
    () =>
      events?.filter(
        (event) =>
          event?.eventName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event?.eventCode?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [events, searchQuery]
  );

  return (
    <div className='w-full container mx-auto mt-16'>
      <div className='container flex gap-8'>
        <EventCard
          upcomingEventsCount={eventCount?.upcoming}
          color={'#5ED500'}
          title={'Upcoming Events'}
        />
        <EventCard
          upcomingEventsCount={eventCount?.ongoing}
          color={'#FBBF02'}
          title={'Ongoing Events'}
        />
        <EventCard
          upcomingEventsCount={eventCount?.past}
          color={'#E00000'}
          title={'Past Events'}
        />
      </div>

      <div className='my-8'>
        <h1 className='text-xl font-semibold text mb-1'>
          Event Search Result(s)
        </h1>
        <p className='text-gray-600 text-base font-normal'>
          Get your results using the search field. Refine further by using the
          filters.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center'>
          <div className='relative px-2'>
            <Search
              className='absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm'
              width={'18px'}
            />
            <input
              autoFocus
              type='text'
              value={searchQuery}
              onChange={handleSearchChange} // Update state on change
              placeholder='Search by event title or code'
              className='border-2 rounded pl-8 pr-4 py-2 w-80 mr-2 focus:outline-none focus:border-[#FF5B2E] transition-colors duration-300'
            />
          </div>
          {/* <span className='mr-2 text-[#201502] font-semibold text-sm'>
            Filters:
          </span> */}
          {/* Filter with Name */}
          {/* <label className='flex items-center bg-gray-100 px-3 py-2 rounded-md mr-2 cursor-pointer'>
            <input
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>Title</span>
          </label>

          <label className='flex items-center bg-gray-100 px-3 py-2 rounded-md mr-5 cursor-pointer '>
            <input
              type='checkbox'
              className='myClass custom-checkbox w-4 h-4 rounded mr-2 accent-[#FF5B2E]'
            />
            <span className='text-[#201502] text-sm font-bold'>Event Code</span>
          </label> */}

          <div class='my-2 mx-2'>
            {/* <span className='mr-2 text-[#201502] font-semibold text-sm'>
              Sort by:
            </span> */}
            <FilterSortComponent />
            {/* <select
              id='event-status'
              class='border-2 rounded-md p-1 w-max bg-white text-[#201502] focus:outline-none focus:border-[#FF5B2E] transition-colors duration-300'
            >
              <option value='all'>All Events</option>
              <option value='upcoming'>Upcoming Events</option>
              <option value='ongoing'>Ongoing Events</option>
              <option value='past'>Past Events</option>
            </select> */}
          </div>
          <div className='my-2'>
            <Sort />
          </div>
        </div>

        <button
          className='bg-[#201502] text-base text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-[#FF5B2E]'
          onClick={() => navigate('/event/copy')}
        >
          <Plus width={'18px'} />
          Create New Event
        </button>
      </div>

      {/* Events Table */}
      <table className='min-w-full bg-white border border-gray-200 border-x-0'>
        <thead className='rounded-lg'>
          <tr className='bg-gray-100 text-left '>
            <th className='py-2 px-4 border-b'>Status</th>
            <th className='py-2 px-4 border-b'>Event Title</th>
            <th className='py-2 px-4 border-b'>Event Code</th>
            <th className='py-2 px-4 border-b'>Start Date</th>
            <th className='py-2 px-4 border-b'>End Date</th>
            <th className='py-2 border-b pr-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents?.length > 0 ? (
            filteredEvents
              ?.sort((eventA, eventB) => {
                const statusPriority = {
                  Upcoming: 1,
                  Ongoing: 2,
                  Past: 3,
                };
                return (
                  statusPriority[eventA?.status] -
                  statusPriority[eventB?.status]
                );
              })
              ?.map((event, index) => {
                const status = getEventStatus(event.startDate, event.endDate);
                return (
                  <tr key={index}>
                    <td className='py-2 px-3 border-b'>
                      <span
                        className={`inline-flex items-center justify-center w-24 h-8 border rounded-full ${
                          status === 'Upcoming'
                            ? 'border-green-500 text-green-500'
                            : status === 'Ongoing'
                            ? 'border-yellow-500 text-yellow-500'
                            : 'border-red-500 text-red-500'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className='py-2 px-4 border-b'>{event.eventName}</td>
                    <td className='py-2 px-4 border-b'>{event.eventCode}</td>
                    <td className='py-2 px-4 border-b'>{event.startDate}</td>
                    <td className='py-2 px-4 border-b'>{event.endDate}</td>
                    <td className='py-2 border-b'>
                      <div className='flex space-x-4'>
                        <div className='relative group'>
                          <button className='flex items-center text-[#201502] hover:text-red-500 transition-colors duration-200'>
                            <Eye />
                          </button>
                          <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:flex items-center bg-[#525150] text-white text-xs px-3 py-1 rounded w-max'>
                            View Event
                          </span>
                        </div>
                        <div className='relative group'>
                          <button
                            className='flex items-center text-[#201502] hover:text-red-500 transition-colors duration-200'
                            onClick={() => {
                              setCurrentEvent(event);
                              navigate(`/event/copy`);
                            }}
                          >
                            <Copy />
                          </button>
                          <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:flex items-center bg-[#525150] text-white text-xs px-3 py-1 rounded w-max'>
                            Copy Event
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td colSpan={6} className='text-center py-4 text-gray-500'>
                No events present
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
