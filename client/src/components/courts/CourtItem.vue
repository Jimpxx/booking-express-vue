<template>
  <div class="court">
    <h3>{{ schedule.courtId.name }}</h3>
    <ul>
      <li
        v-for="slot in schedule.slots"
        :key="slot.id"
        class="slot"
        :class="{ available: !slot.booked, occupied: slot.booked, added: isAdded(slot) }"
        @click="toggleAdded(slot)"
      >
        {{ slot.hour }}:00 - {{ slot.booked ? 'Bokad' : 'Ledig' }}
      </li>
    </ul>
    <div class="button-actions">
      <button @click="reserveSlots" :disabled="userSlots.length == 0">Reserve</button>
    </div>
  </div>
</template>

<script>
import { toRefs, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { formatDate } from '@/utils/helpers';

export default {
  props: ['schedule', 'date', 'willClear'],
  setup(props, context) {
    const store = useStore();
    const { schedule, date, willClear } = toRefs(props);
    const userSlots = ref([]);
    console.log(schedule.value.date);

    watchEffect(() => {
      if (willClear.value) {
        userSlots.value = [];
        context.emit('confirmClear');
      }
    });

    const toggleAdded = (slot) => {
      if (slot.booked) {
        return;
      }
      if (userSlots.value.includes(slot.hour)) {
        userSlots.value.splice(userSlots.value.indexOf(slot.hour), 1);
      } else {
        userSlots.value.push(slot.hour);
      }
      console.log(userSlots.value);
    };
    const isAdded = (slot) => userSlots.value.includes(slot.hour);
    const reserveSlots = () => {
      console.log(userSlots.value);
      store.dispatch('schedules/reserveSlots', {
        slots: userSlots.value,
        date: formatDate(date.value),
        court: schedule.value.courtId._id,
      });
      console.log(schedule);
      context.emit('slotsReserved');
      // userSlots.value = [];
    };
    return { toggleAdded, isAdded, reserveSlots, userSlots };
  },
};
</script>

<style scoped>
.court {
  width: 20%;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background: #fff;
  margin: 1rem;
}

ul {
  list-style: none;
  /* margin: 0; */
  padding: 0;
}
.slot {
  padding: 0.5rem;
  margin: 0.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.available {
  background: rgb(182, 240, 94);
}
.occupied {
  background: rgb(233, 102, 85);
}
.added {
  background: palevioletred;
}
</style>
