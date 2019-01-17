import Vue, { VNode } from 'vue'

const Subscribe = Vue.extend({
  props: {
    to: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      stores: []
    }
  },
  computed: {
    states () {
      return this.to.map(store => {
        store.unsubscribe(this.onUpdate)
        store.subscribe(this.onUpdate)
        this.stores.push(store)
        return store.get()
      })
    }
  },
  updated () {
    this._unsubscribe()
  },
  beforeDestroy () {
    this._unsubscribe()
  },
  methods: {
    _unsubscribe() {
      this.stores.forEach(store => {
        store.unsubscribe(this.onUpdate)
      })
    },
    onUpdate () {
      this.$forceUpdate()
    }
  },
  render(createElement): VNode {
    return createElement('div', [
      this.$scopedSlots.default({
        state: this.states
      })
    ])
  }
})

export default Subscribe
