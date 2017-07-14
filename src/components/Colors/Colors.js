import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import colorable from 'colorable';
import ReactTooltip from 'react-tooltip';

import ColorSwatch from './ColorSwatch';
import './Colors.css';

class Colors extends Component {
  renderSwatches() {
    const colors = this.props.store.colors;
    const contrast = colorable(colors);

    return (
      <div>
        <h2>Brand Colors</h2>
        <div className="row">
          {Object.keys(contrast).map(key => (
            <ColorSwatch key={key} color={contrast[key]} />
          ))}
        </div>
      </div>
    )
  }

  renderA11yTable() {
    const colors = this.props.store.colors;
    const contrast = colorable(colors, {compact: true, threshold: 3});

    return (
      <div>
        <h2>Accessibility Table</h2>
        <table className="table tlbx-table">
          <thead>
            <tr>
              <th></th>
              {Object.keys(contrast).map(key => <th key={key}><span className="tlbx-contrast-text" style={{color: contrast[key].hex}}>Aa</span></th>)}
            </tr>
          </thead>
          <tbody>
            {Object.keys(contrast).map(key => {
              const baseColor = contrast[key]

              return (
                <tr key={key}>
                  <td scope="row">
                    <div className="tlbx-contrast-color">
                      <span className="tlbx-contrast-color-thumb" style={{background: baseColor.hex}}></span>
                      <span>{baseColor.name}<br /><small className="text-muted">{baseColor.hex}</small></span>
                    </div>
                  </td>
                  {Object.keys(contrast).map(key2 => {
                    const otherColor = contrast[key2];

                    const combination = baseColor.combinations.find(item => {
                      return item.name === otherColor.name;
                    });

                    if (!combination) {
                      return <td key={key2}><span className="tlbx-contrast-none"></span></td>;
                    }

                    return (
                      <td key={key2}>
                        <span
                          className="tlbx-contrast-color-thumb"
                          style={{background: baseColor.hex, color: otherColor.hex}}
                          data-tip=''
                          data-for={key2}
                          data-multiline={true}
                          data-class="text-left"
                        >
                          Aa
                        </span>
                        <ReactTooltip
                          id={key2}
                          getContent={() => {
                            return Object.keys(combination.accessibility).map(color => {
                              return (
                                <div className={combination.accessibility[color] ? 'text-success' : 'text-danger'} key={color}>
                                  {`${color}: ${combination.accessibility[color] ? '✔︎' : '✘'}`}
                                </div>
                              );
                            });
                          }}
                        />
                      </td>
                    )

                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>
          <strong>aa</strong> - contrast greater than 4.5 (for normal sized text)<br />
          <strong>aaLarge</strong> - contrast greater than 3 (for bold text or text larger than 24px)<br />
          <strong>aaa</strong> - contrast greater than 7<br />
          <strong>aaaLarge</strong> - contrast greater than 4.5
        </p>
        <p>For more info, please visit <a href="https://www.w3.org/TR/WCAG20/#visual-audio-contrast">WCAG 2.0 Guidelines</a>
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid">

        {this.renderSwatches()}
        {this.renderA11yTable()}

      </div>
    )
  }
}

export default inject('store')(observer(Colors));