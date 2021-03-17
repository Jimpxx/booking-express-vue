export default {
  setSchedule(state, payload) {
    state.schedules = payload;
  },

  updateOneSchedule(state, payload) {
    // const index = state.schedules.indexOf(payload);
    // console.log(index);
    // state.schedules[index] = payload;
    state.schedules = state.schedules.map((schedule) => {
      if (schedule._id === payload._id) {
        return payload;
      }
      return schedule;
    });
    console.log(state.schedules);
  },
};
