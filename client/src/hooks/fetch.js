import { reactive, watchEffect } from 'vue';

export default function useFetch(url, options = null) {
  const state = reactive({
    loading: false,
    error: null,
    data: null,
  });

  const fetchData = async () => {
    state.loading = false;
    state.error = null;
    state.data = null;

    try {
      state.loading = true;
      const response = await fetch(url.value, options);
      if (response.ok) {
        const json = await response.json();
        state.data = json;
      } else {
        state.error = 'Error fetching data.';
      }
    } catch (err) {
      state.error = `Error fetching data. ${err.message}`;
    }
    state.loading = false;
  };

  watchEffect(() => {
    fetchData();
  });

  return state;
}
