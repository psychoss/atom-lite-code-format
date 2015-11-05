var child_process = require("child_process");

const COMMAND_OPEN_CMD_LINE = " && gnome-terminal"
const COMMAND_GO_FMT = "gofmt ";
const COMMAND_CLANG_FMT = "clang-format ";

function runCommand(cmd, callback) {
  child_process.exec(cmd, callback)
}

// exclude the extion
function parseFileName(argument) {

  if (~argument.lastIndexOf("."))
    return argument = argument.substr(0, argument.lastIndexOf("."))
  return argument
}
// format the go or c lang source file
function formatGolang() {
  console.log("atom-min-format:");
  var editor = atom.workspace.getActiveTextEditor();
  var file = editor.getPath();
  console.log("atom-min-format:" + file);
  if (/\.go$/.test(file) || /\.c$/.test(file)) {
    console.log("atom-min-format:" + file);
    var go = /\.go$/.test(file)
    var cmd = go ? COMMAND_GO_FMT : COMMAND_CLANG_FMT;
    var run = go ? "\n // go run "+file : "\n // cc " + file + " -o " + parseFileName(file) + " && " + parseFileName(file)
    cmd += file;
    runCommand(cmd, function(err, stdout, stderr) {
      if (stdout) {
        if (go) {
          if (!/\\\\ go run/.test(stdout)) {
            stdout+=run;
          }
        }else {
          if (!/\\\\ cc/.test(stdout)) {
            stdout+=run;
          }
        }
        editor.setText(stdout);

      }

      if (err) {
        atom.notifications.addWarning(err.toString())
      }
    })
  }

}

// Open the terminal with the actived file's directory as the work directory

function openTerminal(argument) {
  var editor = atom.workspace.getActiveTextEditor();
  var directory = editor.getPath();
  directory = directory.substr(0, directory.lastIndexOf("/"));
  runCommand("cd " + directory + COMMAND_OPEN_CMD_LINE, null);
}

function init(argument) {
  atom.commands.add('atom-workspace', 'atom-min-format:gofmt', formatGolang)
  atom.commands.add('atom-workspace', 'atom-min-format:terminal', openTerminal)


}

init();
