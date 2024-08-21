import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // BOOKINGS
  const { length: numBookings } = bookings;

  // SALES
  const sales = bookings.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );

  // CHECKINS
  const { length: checkins } = confirmedStays;

  // OCCUPANCY RATE
  const nightsSold = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const totalNights = numDays * cabinCount;
  const occupationRate = Math.round((nightsSold / totalNights) * 100);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />

      <Stat
        title="Occupancy rate"
        color="yelow"
        icon={<HiOutlineChartBar />}
        value={occupationRate + '%'}
      />
    </>
  );
}

export default Stats;
