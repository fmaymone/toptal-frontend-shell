import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import AltIconAvatar from "../../components/AltIconAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Email from "@material-ui/icons/Email";
import OfflinePin from "@material-ui/icons/OfflinePin";
import Divider from "@material-ui/core/Divider";
import Scrollbar from "../../components/Scrollbar";
import List from "@material-ui/core/List";


class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  

  renderList(users) {
    if (users === undefined) {
      return <div />;
    }

    return users.map((user, index) => {
      return (
        <div key={index}>
          <ListItem
            key={index}
            onClick={() => {
              this.props.handleRowClick(user.id);
            }}
            id={index}
          >
            <AltIconAvatar src={null} iconName={"person"} />
            <ListItemText primary={user.name} secondary={user.email} />
            <Toolbar>
              <div key={index}>
                <Email color="primary" />
              </div>
            </Toolbar>
            <OfflinePin color={user.connections ? "primary" : "disabled"} />
          </ListItem>
          <Divider inset={true} />
        </div>
      );
    });
  }
  render() {
    return (
      <div style={{ height: "100%", overflow: "none" }}>
        <Scrollbar>
          <List id="test" ref={field => (this.list = field)}>
            {this.renderList(this.props.users)}
          </List>
        </Scrollbar>
      </div>

    );
  }
}

export default UsersList;