'use strict';

const React = require('react');

const ConfigTab = require('./config-tab');
const TemplateTab = require('./template-tab');

const Menu = require('../primed/menu');
const MenuItem = require('../primed/menu-item');

class Layout extends React.Component {
  constructor(...args){
    super(...args);

    this.state = {
      tab: 0
    };
  }

  updateTab(idx, evt){
    evt.preventDefault();

    this.setState({
      tab: idx
    });
  }

  render(){
    const { tab } = this.state;

    let TabComponent;
    if(tab === 0){
      TabComponent = TemplateTab;
    }

    if(tab === 1){
      TabComponent = ConfigTab;
    }

    return (
      <main className='container'>
        <h1>Git-Splainin Options</h1>
        <section className="columns">
          <div className="one-fifth column">
            <Menu selected={tab}>
              <MenuItem href='#' onClick={(evt) => this.updateTab(0, evt)}>
                <span className='octicon octicon-pencil'></span>
                Template
              </MenuItem>
              <MenuItem href='#' onClick={(evt) => this.updateTab(1, evt)}>
                <span className='octicon octicon-gear'></span>
                Configuration
              </MenuItem>
            </Menu>
          </div>
          <TabComponent />
        </section>
      </main>
    );
  }
}

module.exports = Layout;
