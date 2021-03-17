// import { formatDate } from '@/utils/helpers';

async function fetchSchedule(court, date) {
  const response = await fetch(`http://localhost:5000/api/v1/schedules/${court}/${date}`);
  if (!response.ok) {
    console.log('No existing, creating a new');
    const result = await fetch('http://localhost:5000/api/v1/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        courtId: court,
      }),
    });
    // return result;
    const data = await result.json();
    return data.data;
  }
  // return response;
  const json = await response.json();
  return json.data;
}

export default {
  async fetchSchedulesByCourtDate(context, payload) {
    const { courts, date } = payload;
    if (!courts) {
      return;
    }
    // const arr = [];
    // console.log(courts);

    const arr = await Promise.all(
      courts.map((court) => fetchSchedule(court._id, date).then((data) => data)),
    );
    // courts.forEach(async (court) => {
    //   console.log('court', court._id);
    //   fetchSchedule(court._id, date).then((result) => {
    //     arr.push(result);
    //     console.log(arr.slice());
    //     // context.commit('addSchedule', result);
    //   });
    //   // console.log(data);
    //   // arr.push(data);
    // });
    // console.log(arr.slice());

    // const a = await Promise.all(arr);

    console.log(arr);

    context.commit('setSchedule', arr);
  },

  async reserveSlots(context, payload) {
    const { slots, court, date } = payload;

    const response = await fetch(`http://localhost:5000/api/v1/schedules/${court}/${date}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slots,
      }),
    });
    const json = await response.json();
    console.log(json.data);
    context.commit('updateOneSchedule', json.data);
  },
};
