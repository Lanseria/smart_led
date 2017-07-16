import io from 'socket.io-client'
const LED = {
  socket: null,
  userid: null,
  submit (msg) {
    if (msg !== '') {
      let obj = {
        userid: this.userid,
        msg: msg
      }
      this.socket.emit('message', obj)
    } else {
      console.log('msg is null')
    }
  },
  open () {
    let obj = {
      userid: this.userid,
      msg: '1111'
    }
    this.socket.emit('message', obj)
  },
  close () {
    let obj = {
      userid: this.userid,
      msg: '1211'
    }
    this.socket.emit('message', obj)
  },
  adjust (data) {
    let val = parseInt(256 / 5 * data)
    val = ('000' + val).slice(-3)
    let obj = {
      userid: this.userid,
      msg: '2' + val
    }
    this.socket.emit('message', obj)
  },
  init () {
    this.socket = io.connect()
    this.socket.on('status', (data) => {
      console.log('hello')
    })
  }
}
export default LED
