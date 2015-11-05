# A simple atom extension for format the source file of go or c language source file.

the lite reformat tool is deeply depend on "gofmt" and "clang-format"。

so, if you want a try, should first check to make sure have install the two,
and the path where they are placed whether had been added to environment variable

how it work is simple, when active the tool, it will invoke the matched tool via the node.js.
then just use the result to replace the text.but, more than that, it will add some command for run the written code easy.

i have boring by the heavily packages that make the wonderful ide so slowly.

simple if suite what you want,isnt is prefect,
actually, this is also a example to help you make yourself atom extion.
