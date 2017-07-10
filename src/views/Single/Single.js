import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/styles';

import './Single.css';

class Single extends Component {
  constructor() {
    super();

    this.state = {
      component: {},
      content: '',
      variants: [],
    }
  }

  componentWillMount() {
    this.getContent(this.props);
  }

  componentWillUnMount() {
    this.setState({
      component: {},
      content: '',
      variants: [],
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getContent(nextProps);
  }

  getContent(props) {
    const params = props.match.params;
    const components = props.store.components[params.type]; 
    const component = components.find(item => item.slug === params.slug);

    this.setState({ component, variants: [] });

    component.content.then(twig => {
      this.setState({ content: twig.render(this.props.store.data) });
    });

    if (component.variants) {
      component.variants.forEach((variant) => {
        variant.then(twig => {
          this.setState({ variants: [...this.state.variants, twig.render(this.props.store.data)] });
        });
      });
    }
  }

  render() {
    const variants = this.state.variants.length > 0 && (
      <div>
        <hr/>
        <h3>Variants</h3>

        {this.state.variants.map((variant, key) => {
          return (
            <div className="toolbox-item-preview" key={key}>
              <div dangerouslySetInnerHTML={{ __html: variant }} />
              <SyntaxHighlighter 
                language='html' 
                style={atomOneDark}
              >
                {variant}
              </SyntaxHighlighter>
            </div>
          );
        })}
      </div>
    );

    return (
      <div>
        <h1>{this.state.component.config.title}</h1>
        <p>{this.state.component.config.notes}</p>
        <div className="toolbox-item-preview">
          <div className="" dangerouslySetInnerHTML={{ __html: this.state.content }} />
          <SyntaxHighlighter 
            language='html' 
            style={atomOneDark}
          >
            {this.state.content}
          </SyntaxHighlighter>
        </div>
        {variants}
      </div>
    );
  }
}

Single.propTypes = {
  components: PropTypes.object,
};

export default inject('store')(observer(Single));