var fs = require('fs');
let input = fs.readFileSync('4input.txt').toString().trim()

let lines = input.split('\n').sort()

let events = lines
    .map(l => l.match(/\[(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)\] (Guard #(\d+))?(wakes up)?(falls asleep)?/))
    .map(m => ({
      y: parseInt(m[1], 10),
      m: parseInt(m[2], 10),
      d: parseInt(m[3], 10),
      hh: parseInt(m[4], 10),
      mm: parseInt(m[5], 10),
      guard: parseInt(m[7], 10),
      wakes: !!m[8],
      sleeps: !!m[9]
    }))


let { guards, mostAsleep } = events.reduce((state, event) => {
  if (event.guard) {
    state.guards[event.guard] = state.guards[event.guard] || { total: 0, sleeps: [] }
    state.currentGuard = event.guard
  } else if (event.sleeps) {
    state.currentMinute = event.mm
  } else if (event.wakes) {
    let dur = event.mm - state.currentMinute
    state.guards[state.currentGuard].total += dur
    state.guards[state.currentGuard].sleeps.push({ start: state.currentMinute, end: event.mm, dur: dur })

    if (state.guards[state.currentGuard].total > state.mostAsleep.total) {
      state.mostAsleep = {
        id: state.currentGuard,
        ...state.guards[state.currentGuard]
      }
    }
  }

  return state
}, {
  guards: {},
  currentGuard: null,
  currentMinute: null,
  mostAsleep: {
    id: null,
    sleeps: null,
    total: 0
  }
})


function countSleeps(guard) {
  return guard.sleeps.reduce((state, s) => {
    for (let i = s.start; i < s.end; i++) {
      state.minutes[i] = state.minutes[i] + 1 || 1
      if (state.minutes[i] > state.maxMinute.times) {
        state.maxMinute = { minute: i, times: state.minutes[i] }
      }
    }
    return state
  }, {
    minutes: {},
    maxMinute: {
      minute: null,
      times: 0
    }
  }).maxMinute
}


let part = 2

if (part == 1) {

  let maxMinute= countSleeps(mostAsleep)
  console.log(maxMinute.minute * mostAsleep.id)

} else if (part == 2) {

  let result = Object.keys(guards).reduce((state, id) => {
    let maxMinute = countSleeps(guards[id])
    if (maxMinute.times > state.times) {
      return {
        id: id,
        ...maxMinute
      }
    }
    return state
  }, {
    id: null,
    minute: null,
    times: 0
  })

  console.log(result.id * result.minute)
}
