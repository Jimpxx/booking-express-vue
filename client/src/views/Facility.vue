<template>
  <div class="container">
    <aside class="sidebar">
      <div class="date-picker">
        <DatePicker
          mode="date"
          :firstDayOfWeek="2"
          v-model="date"
          @dayclick="dateChange"
          :min-date="new Date()"
          :max-date="addDates(new Date())"
        />
      </div>
      <div v-if="facility" class="facility">
        <h2>{{ facility.name }}</h2>
        <div class="location">
          <p>Location:</p>
          <p v-if="facility.address">
            {{ facility.address.street }}, {{ facility.address.city }}
            {{ facility.address.zip }}
          </p>
        </div>
      </div>
    </aside>
    <main>
      <div v-if="facility.courts" class="courts">
        <h2>{{ formatDate(date) }}</h2>
        <court-list :courts="facility.courts" :date="date"></court-list>
        <!-- {{ courts }} -->
        <!-- {{ facility }} -->
      </div>
    </main>
  </div>
</template>

<script>
import { ref, toRefs, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
// import { useRoute } from 'vue-router';
import { DatePicker } from 'v-calendar';
import CourtList from '@/components/courts/CourtList.vue';
// import useFetch from '../hooks/fetch';
import { addDates, formatDate } from '../utils/helpers';

export default {
  components: {
    DatePicker,
    CourtList,
  },
  props: ['id'],
  setup(props) {
    const store = useStore();
    // const route = useRoute();
    const date = ref(new Date());
    // let error = ref(null);
    // let isLoading = ref(false);
    // let facility = ref();
    // const schedules = ref([]);
    // const courts = ref([]);

    const { id } = toRefs(props);
    // await store.dispatch('facility/fetchFacility', id.value);

    // const facilityUrl = computed(() => `http://localhost:5000/api/v1/facilities/${id.value}`);
    // const id2 = computed(() => route.params.id);
    // const facility = computed(() => useFetch(facilityUrl));

    // console.log(facility2.value);
    // const courts = computed(() => {
    //   if (facility.value.data) {
    //     return facility.value.data.data.courts;
    //   }
    //   return null;
    // });

    // store.dispatch('schedules/fetchSchedulesByCourtDate', {
    //   date: formatDate(date.value),
    //   courts: facility.value.courts,
    // });

    // console.log(id2);

    // watch(id2, store.dispatch('facility/fetchFacility', id2.value));
    watchEffect(async () => {
      await store.dispatch('facility/fetchFacility', id.value);
    });

    const facility = computed(() => store.getters['facility/facility']);
    // const updateCourts = () => {
    //   courts.value = facility.value.data.data.courts;
    // };

    // watchEffect(() => {
    //   courts.value = facility.value.data.data.courts;
    // });

    // watch(facility.value, updateCourts);

    const dateChange = async () => {
      console.log('Date changed', date.value);
      console.log(facility.value.courts);
      // await store.dispatch('schedules/fetchSchedulesByCourtDate', {
      //   date: formatDate(date.value),
      //   courts: facility.value.courts,
      // });
      // console.log(courts);

      // ({ data: facility, error, isLoading } = await useFetch(
      //   `http://localhost:5000/api/v1/facilities/${id.value}`,
      // ));
      // console.log(facility);
      // console.log(error);
      // console.log(isLoading);
    };

    // console.log(id.value);

    // onMounted(() => {
    //   // console.log('OnMounted');
    //   // store.dispatch('facility/fetchFacility', id.value);
    //   dateChange();
    // });

    // onUpdated(() => {
    //   console.log('OnUpdate');
    //   dateChange();
    // });

    return {
      date,
      dateChange,
      addDates,
      formatDate,
      // isLoading,
      // error,
      // facility2,
      facility,
      // courts,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
}

main {
  background: #eee;
}
aside {
  background: #eee;
}
</style>
