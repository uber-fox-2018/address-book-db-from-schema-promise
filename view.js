class View {
  constructor() {
  }
  help() {
    console.log(`node index contact add <name> <phone> <email> <office>
                node index contact update <id> <value>
                node index contact delete <id>
                node index contact find <Col:Row> <Constraint>
                node index contact show <id>
                node index group add <name>
                node index group update <id> <value>
                node index group delete <id>
                node index group show <id>
                node index group assign <contactName> <groupName>`);
  }

  display(msg) {
    console.log(msg);
  }
}

module.exports = View;
