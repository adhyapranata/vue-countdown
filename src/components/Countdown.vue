<template>
  <div>
    <div v-if="! finished">
      <span>{{ remaining.days() }} Days, </span>
      <span>{{ remaining.hours() }} Hours, </span>
      <span>{{ remaining.minutes() }} Minutes, </span>
      <span>{{ remaining.seconds() }} Seconds </span> left...
    </div>
    <p 
      v-else 
      v-text="message"/>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Countdown",

  props: {
    until: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: 'Now Expired'
    }
  },

  data() {
    return {
      now: new Date()
    };
  },

  computed: {
    remaining() {
      return moment.duration(Date.parse(this.until) - this.now);
    },

    finished() {
      if (this.remaining > 0) {
        return false
      }

      this.$emit('finished');
      return true;
    }
  },

  created() {
    const interval = setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.$on('finished', () => clearInterval(interval));
  }
};
</script>
