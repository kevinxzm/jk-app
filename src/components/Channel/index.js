import React from "react";
import { getChannel } from "api/managementApi";
import { Form, Select } from "antd";

export class Channel extends React.Component {
  state = {
    channel: [],
  };
  render() {

    
    return (
      <Select
        placeholder="please select one channel below"
        style={{
          width: 250,
        }}
        options={this.state.channel.map((x) => ({
          value: x.id,
          label: x.name,
        }))}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }

  componentDidMount() {
    this.getChannel();
  }

  getChannel = async () => {
    var result = await getChannel();
    this.setState({
      channel: result.data.channels,
    });
  };
}
