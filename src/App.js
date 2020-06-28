import React, { Component } from 'react';
import './App.css';


class App extends Component {


  state = {
    chatmessage: null,
    loading: true,
    chatMessageToSend: null,
    userHistory: [],
    botHistory: []

  }

  sendMessageToBot(text) {
    fetch('https://localhost:5001/api/chatbot/' + text)
      .then(res => res.json())
      .then((data) => {
        this.setState({ chatmessage: data.cnt })
        this.setState({ loading: false })
        console.log(this.state.chatmessage)
        var userAndBotItem = {user: text, bot: this.state.chatmessage};
        this.setState({
          userHistory: [...this.state.userHistory, text],
          botHistory: [...this.state.botHistory, userAndBotItem]
        })
        console.log(this.state.userHistory)


      })
      .catch(console.log)
  }

  async componentDidMount() {
    fetch('https://localhost:5001/api/chatbot/do you want to chat with meS')
      .then(res => res.json())
      .then((data) => {
        this.setState({ chatmessage: data.cnt })
        this.setState({ loading: false })

      })
      .catch(console.log)
  }
  myChangeHandler = (event) => {
    this.setState({ chatMessageToSend: event.target.value });
  }



  render() {
    return (
      <div>
        {this.state.loading ? <div>Loading...</div> : "Latest answer: " + this.state.chatmessage}
        <form>
          <p>Enter a message to God:</p>
          <input
            type='text'
            onChange={this.myChangeHandler}
          />
        </form>
        <button onClick={() => { this.sendMessageToBot(this.state.chatMessageToSend) }}>
          Send
        </button>

        <ul>
          {this.state.botHistory.map((message) => {
            return (<li key={message}>You said: {message.user}  <br></br>Bot answered: {message.bot}</li>)
          })}

        </ul>



      </div>


    )

  }
}



export default App;
