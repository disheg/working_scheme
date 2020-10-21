import React from 'react';
import update from 'immutability-helper';
import Table from './Components/Table/Table';
import THead from './Components/Table/Thead';
import TBody from './Components/Table/TBody';
import Btn from './Components/Btn';
import personal from './Data/Data';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      navigation: 'week1',
      data: personal,
    };
  }

  addWorker = (workerName) => {
    const { data } = this.state;
    const newWorker = {
      name: workerName,
      jobtime: {
        week1: {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          sunday: '',
        },
        week2: {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          sunday: '',
        },
        week3: {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          sunday: '',
        },
        week4: {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          sunday: '',
        },
      },
    };
    this.setState({
      data: [...data, newWorker],
    });
  };

  updateSchema = (name, week, [day, time]) => {
    const { data } = this.state;
    let id = null;

    const person = data.filter((element, loopId) => {
      if (element.name === name) {
        id = loopId;
        return true;
      }
      return false;
    });
    const newPerson = update(...person, {
      jobtime: {
        [week]: {
          [day]: {
            $set: time,
          },
        },
      },
    });

    const collection = this.state;
    const newCollection = update(collection, {
      data: {
        [id]: {
          $set: newPerson,
        },
      },
    });

    this.setState(newCollection);
  };

  renderTable = () => {
    const { data, navigation } = this.state;
    if (navigation === 'total') {
      const arrayOfTh = ['Name', 'Hours', 'Working time percentage'];
      return (
        <Table>
          <THead data={arrayOfTh} />
          <TBody data={data} navigation={navigation} />
        </Table>
      )
    }
    const arrayOfTh = ['Name', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
      <Table>
        <THead data={arrayOfTh} />
        <TBody data={data} updateSchema={this.updateSchema} week={navigation} />
      </Table>
    );
  }

  handleBtnClick = (e) => {
    const { name } = e.target;
    this.setState({ navigation: name });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <button type="button" name="week1" onClick={this.handleBtnClick}>Week 1</button>
              <button type="button" name="week2" onClick={this.handleBtnClick}>Week 2</button>
              <button type="button" name="week3" onClick={this.handleBtnClick}>Week 3</button>
              <button type="button" name="week4" onClick={this.handleBtnClick}>Week 4</button>
              <button type="button" name="total" onClick={this.handleBtnClick}>Total</button>

              {this.renderTable()}
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Btn data={data} func={this.addWorker} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
