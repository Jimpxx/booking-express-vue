<template>
  <div class="courts">
    <p v-if="schedules.length == 0">No Courts found</p>
    <div v-else class="schedules">
      <court-item
        v-for="schedule in schedules"
        :key="schedule._id"
        :schedule="schedule"
        :date="date"
        @slotsReserved="clearAllSlots"
        :willClear="willClear"
        @confirmClear="confirmClear"
      ></court-item>
    </div>
    <pre>

    <!-- {{ schedules }} -->
    </pre>
    <!-- {{ courts }} -->
  </div>
</template>

<script>
import { computed, watchEffect, toRefs, ref } from 'vue';
import { useStore } from 'vuex';
// import useFetch from '@/hooks/fetch';
import { formatDate } from '@/utils/helpers';
import CourtItem from '@/components/courts/CourtItem.vue';

export default {
  props: ['courts', 'date'],
  components: {
    CourtItem,
  },
  setup(props) {
    const store = useStore();
    // const { courts } = toRefs(props);
    // const { date } = toRefs(props);
    // const schedules = ref([]);

    const { courts, date } = toRefs(props);

    const willClear = ref(false);

    const clearAllSlots = () => {
      console.log('Clearing...');
      willClear.value = true;
    };

    const confirmClear = () => {
      willClear.value = false;
    };

    // store.dispatch('schedules/fetchSchedulesByCourtDate', {
    //   date: formatDate(date.value),
    //   courts: courts.value,
    // });
    // console.log(courts);
    // console.log(date.value);
    const schedules = computed(() => store.getters['schedules/schedules']);

    console.log(schedules.value);

    // const fetchSchedules = () => {
    //   schedules.value = [];
    //   courts.value.forEach(async (court) => {
    //     // const data = useFetch(
    //     //   `http://localhost:5000/api/v1/schedules/${court._id}/${formatDate(date.value)}`,
    //     // );
    //     const response = await fetch(
    //       `http://localhost:5000/api/v1/schedules/${court._id}/${formatDate(date.value)}`,
    //     );
    //     if (!response.ok) {
    //       console.log('Error');
    //     }
    //     const json = await response.json();
    //     const data = json;
    //     console.log(data);
    //     schedules.value.push(data.data);
    //     // if (data.data) {
    //     //     }
    //   });
    // };

    watchEffect(() => {
      store.dispatch('schedules/fetchSchedulesByCourtDate', {
        date: formatDate(date.value),
        courts: courts.value,
      });
    });

    // onMounted(async () => {
    //   // fetchSchedules();

    // });

    // const schedules = computed(() => {
    //   const arr = [];
    //   props.courts.forEach((court) => {
    //     console.log(court.value);
    //     const schedule = useFetch(
    //       `http://localhost:5000/api/v1/schedules/${court.value._id}/${formatDate(props.date)}`,
    //     );
    //     arr.push(schedule.data);
    //   });
    //   return arr;
    // });

    return {
      // courts,
      schedules,
      clearAllSlots,
      willClear,
      confirmClear,
    };
  },
};
</script>

<style>
.schedules {
  display: flex;
  justify-content: center;
}
</style>
