import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink, withRouter } from 'react-router-dom'
import Collapse from 'react-css-collapse';
import PropTypes from 'prop-types';

import './SidebarItem.css';

class SidebarItem extends Component {
  constructor() {
    super();

    this.state = {
      active: false,
    }

    this.toggleComponentsList = this.toggleComponentsList.bind(this);
  }

  toggleComponentsList() {
    this.setState({
      active: !this.state.active,
    });
  }

  componentDidMount() {
    const regex = new RegExp(`^/${this.props.group}/`);
    const isCurrent = this.props.location.pathname.match(regex);

    this.setState({
      active: !!isCurrent
    })
  }

  render() {
    const noComponents = (
      <li>
        <small>
          <span className="text-muted">No components yet.</span><br />
          Run <code>$ yo toolbox:generate</code>
        </small>
      </li>
    );


    return (
      <div className={this.state.active ? ' tlbx-open' : ''}>
        <button className="tlbx-sidebar-item" onClick={() => this.toggleComponentsList()}>
          <strong>{this.props.group}</strong>
        </button>
        <Collapse className="tlbx-sidebar-collapse" isOpen={this.state.active}>
          <ul className="tlbx-sidebar-item-list">
            {this.props.store.components[this.props.group].map((component, key) => {
              const path = `/${this.props.group}/${component.name}`;

              return (
                <li key={key}>
                  <NavLink to={path}>
                    {component.title}
                  </NavLink>
                </li>
              )
            })}
            {this.props.store.components[this.props.group].length === 0 && noComponents}
          </ul>
        </Collapse>
      </div>
    );
  }
}

SidebarItem.propTypes = {
  group: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(inject('store')(observer(SidebarItem)));