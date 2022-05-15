import Vue from 'vue'
import moment from 'moment'
Vue.mixin({
  methods: {
    formatDate(date, format) {
      if (date) {
        const momentDate = moment(date)
        if (momentDate.isValid) {
          format = format || 'YYYY-MM-DD'
          return momentDate.format(format)
        } else {
          return ''
        }
      }
    },
    formatDateTime(date) {
      const momentDate = moment(date)
      return momentDate.format()
    },
    formatTime(time) {
      // Hours, minutes and seconds
      const hrs = ~~(time / 3600)
      const mins = ~~((time % 3600) / 60)
      const secs = ~~time % 60

      // Output like "1:01" or "4:03:59" or "123:03:59"
      let ret = ''
      if (hrs > 0) {
        ret += '' + hrs + ' giờ ' + (mins < 10 ? '0' : '')
      }
      ret += '' + mins + ' phút ' + (secs < 10 ? '0' : '')
      ret += '' + secs + ' giây'
      return ret
    },
    formatDollar(price){
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })

      return formatter.format(price || 0);
    }
  }
})
