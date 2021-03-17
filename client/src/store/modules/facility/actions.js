export default {
  async fetchFacility(context, id) {
    const response = await fetch(`http://localhost:5000/api/v1/facilities/${id}`);
    const json = await response.json();
    // console.log(json.data);
    context.commit('setFacility', json.data);
  },
};
