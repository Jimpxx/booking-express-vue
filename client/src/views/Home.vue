<template>
  <div class="home">
    <div class="date-picker">
      <DatePicker
        mode="date"
        v-model="date"
        @dayclick="dateChange()"
        :min-date="new Date()"
        :max-date="addDates(new Date())"
      />
    </div>
    <h2>{{ formatDate(date) }}</h2>
    <div class="slots">
      <ul v-for="(schedule, scheduleIndex) in schedules" :key="schedule._id">
        <h3>{{ schedule.courtId.name }}</h3>
        <li
          class="slot"
          :class="{ available: !slot.booked, occupied: slot.booked, added: slot.added }"
          v-for="(slot, slotIndex) in schedule.slots"
          :key="slot._id"
          @click="toggleAdded(slotIndex, scheduleIndex)"
        >
          {{ slot.hour }}:00 - {{ slot.booked ? 'Bokad' : 'Ledig' }}
        </li>
        <div class="button-actions">
          <button
            @click="reserveSlots(scheduleIndex)"
            :disabled="!schedules[scheduleIndex].addedSlots"
          >
            Reserve
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { DatePicker } from 'v-calendar';

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
      slots: [],
      schedules: [],
      userSlots: [],
      courts: [],
    };
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      let month = `${d.getMonth() + 1}`;
      let day = `${d.getDate()}`;
      const year = `${d.getFullYear()}`;

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join('-');
    },
    async fetchSchedule(date, court) {
      const response = await fetch(`http://localhost:5000/api/v1/schedules/${court}/${date}`);
      if (!response.ok) {
        console.log('NOT OK');
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

      // else {
      //   // console.log(response);
      //   const json = await response.json();
      //   // console.log(json);
      //   return json.data;
      // }
    },
    async dateChange() {
      this.userSlots = [];
      this.schedules = [];
      console.log(this.formatDate(this.date));

      const courtsResponse = await fetch('http://localhost:5000/api/v1/courts');
      const courtJson = await courtsResponse.json();
      this.courts = courtJson.data;
      console.log(this.courts);

      this.courts.forEach(async (court) => {
        /* eslint no-underscore-dangle: 0 */
        const data = await this.fetchSchedule(this.formatDate(this.date), court._id);
        // console.log(data);
        this.schedules.push(data);
      });
      console.log(this.schedules);

      // const response = await fetch(
      //   `http://localhost:5000/api/v1/schedules/602d2b995f0b1605774758ee/${this.formatDate(
      //     this.date,
      //   )}`,
      // );
      // if (!response.ok) {
      //   console.log('NOT OK');
      //   const result = await fetch('http://localhost:5000/api/v1/schedules', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       date: this.formatDate(this.date),
      //       courtId: '602d2b995f0b1605774758ee',
      //     }),
      //   });
      //   // console.log(result);
      //   const data = await result.json();
      //   // console.log(data);
      //   this.slots = data.data.slots;
      // } else {
      //   // console.log(response);
      //   const json = await response.json();
      //   // console.log(json);
      //   this.slots = json.data.slots;
      // }
    },
    async reserveSlots(scheduleIndex) {
      console.log(this.schedules);
      const response = await fetch(
        `http://localhost:5000/api/v1/schedules/${
          this.schedules[scheduleIndex].courtId._id
        }/${this.formatDate(this.date)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slots: this.schedules[scheduleIndex].addedSlots,
          }),
        },
      );
      const json = await response.json();
      this.schedules[scheduleIndex].slots = json.data.slots;
      this.schedules.forEach((_, index) => {
        delete this.schedules[index].addedSlots;
        this.schedules[index].slots.forEach((_2, slotIndex) => {
          delete this.schedules[index].slots[slotIndex].added;
        });
      });
    },
    toggleAdded(slotIndex, scheduleIndex) {
      if (this.schedules[scheduleIndex].slots[slotIndex].booked) {
        return;
      }
      if (!this.schedules[scheduleIndex].addedSlots) {
        this.schedules[scheduleIndex].addedSlots = [];
      }
      if (this.schedules[scheduleIndex].slots[slotIndex].added) {
        // const { name } = this.schedules[scheduleIndex].courtId;
        this.schedules[scheduleIndex].addedSlots = this.schedules[scheduleIndex].addedSlots.filter(
          (item) => item !== this.schedules[scheduleIndex].slots[slotIndex].hour,
        );
        if (this.schedules[scheduleIndex].addedSlots.length === 0) {
          delete this.schedules[scheduleIndex].addedSlots;
        }
        delete this.schedules[scheduleIndex].slots[slotIndex].added;
      } else {
        // const { name } = this.schedules[scheduleIndex].courtId;
        // this.userSlots.push(this.schedules[scheduleIndex].slots[slotIndex].hour);
        // this.schedules[scheduleIndex].addedSlots = [];
        this.schedules[scheduleIndex].addedSlots.push(
          this.schedules[scheduleIndex].slots[slotIndex].hour,
        );
        this.schedules[scheduleIndex].slots[slotIndex].added = true;
      }
      // if (this.schedules[scheduleIndex].slots[slotIndex].booked) {
      //   return;
      // }
      // if (this.schedules[scheduleIndex].slots[slotIndex].added) {
      //   // const { name } = this.schedules[scheduleIndex].courtId;
      //   this.userSlots = this.userSlots.filter(
      //     (item) => item !== this.schedules[scheduleIndex].slots[slotIndex].hour,
      //   );
      //   delete this.schedules[scheduleIndex].slots[slotIndex].added;
      // } else {
      //   // const { name } = this.schedules[scheduleIndex].courtId;
      //   this.userSlots.push(this.schedules[scheduleIndex].slots[slotIndex].hour);
      //   this.schedules[scheduleIndex].slots[slotIndex].added = true;
      // }
    },
    addDates(date) {
      const result = new Date(date);
      result.setDate(result.getDate() + 20); // 20 days forward
      return result;
    },
  },
  mounted() {
    this.dateChange();
  },
};
</script>
<style scoped>
ul {
  width: 20%;
  list-style: none;
  padding: 0.5rem 1rem;
  background: #eee;
  margin: 1rem;
}
.slots {
  display: flex;
}
.slot {
  padding: 0.5rem;
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
