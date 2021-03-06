import React, { Component, PropTypes } from 'react';

class SubtitleRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      warning: false
    };
  }

  renderText(){
    const { index } = this.props;
    if(this.state.showEdit){
      return (
        <td>
          <input type="text"
            defaultValue={this.props.text}
            onBlur={(e) => this.handleTextOnBlur(e, index)}
            onKeyDown={(e) => this.handleOnKeyDown(e, index)}
            autoFocus={true}
            style={{width:'100%'}}
          />
        </td>
      );
    } else{
      return (
        <td className="text" onClick={this.handleTextOnClick.bind(this)}>
          {(this.state.warning)? <span style={{color: 'red'}}>{this.props.text}</span>: <span>{this.props.text}</span>}
        </td>
      );
    }
  }

  handleTextOnClick(){
    this.setState({ showEdit: true});
  }
  handleTextOnBlur(e, index){
    this.submitEdit(e.target.value, index);
  }
  handleOnKeyDown(e, index){
    if( e.which === 13 && e.target.value) {
      this.submitEdit(e.target.value, index);
    }
  }
  submitEdit(text, index){
    this.setState({ showEdit: false });
    this.props.editSubtitleText(index, text);
    this.setState({
      warning: (text.length>12)
    });
  }

  onTimecodeClick(){
    this.props.setPlayTime( this.props.startSecond, this.props.endSecond);
  }

  render() {
    const { index, srtStartTimecode, srtEndTimecode, defaultTag, text } = this.props;
    return (
      <tr>
        <td>
          {index+1}
        </td>
        <td className="timecode" onClick={this.onTimecodeClick.bind(this)}>
          {srtStartTimecode}
        </td>
        <td className="timecode" onClick={this.onTimecodeClick.bind(this)}>
          {srtEndTimecode}
        </td>
        <td>
          {defaultTag}
        </td>
        {this.renderText()}
      </tr>
    );
  }

};

SubtitleRow.propTypes = {
  setPlayTime: PropTypes.func.isRequired,
  editSubtitleText: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  srtStartTimecode: PropTypes.string.isRequired,
  srtEndTimecode: PropTypes.string.isRequired,
  defaultTag: PropTypes.string.isRequired
};

export default SubtitleRow;
