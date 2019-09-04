import React from "react";
import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";
import BotCard from "../components/BotCard";

class BotsPage extends React.Component {
  //start here with your code for step one
  state={
    bots:[],
    botArmy:[]
  }
  
  componentDidMount(){
    fetch("https://bot-battler-api.herokuapp.com/api/v1/bots").then(res=>res.json())
    .then(data=>{
      return this.setState({
        bots:data
      })
    })
  }

  addIntoArmy=(id)=>{
    this.state.bots.map(bot=>{
      if(bot.id===id && !this.state.botArmy.includes(bot)) {
        this.setState({
          botArmy:[...this.state.botArmy, bot]
        })
      }
    })
  }
  removeFromArmy=(id)=>{
    const newArmy=this.state.botArmy.filter(bot=>{
     return bot.id !== id
    })
    this.setState({
      botArmy:newArmy
    })
  }
  render() {
    return (
      <div>
        <YourBotArmy bots={this.state.botArmy}
        onUserClick={this.removeFromArmy}/>
        <BotCollection bots={this.state.bots}
        onUserClick={this.addIntoArmy}
        />
      </div>
    );
  }

}

export default BotsPage;
