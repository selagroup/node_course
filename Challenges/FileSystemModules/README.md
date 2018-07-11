# File System Challenge

Create a simple node application which receives a full file path as an argument
and prints it's content to the console.

The application should validate if the file exists and if the path is a directory.
If the path is a directory it should print the directory contents:

- the app should be broken down into 4 modules:
    - main - the main program file.
    - fsHelper - a helper module, containing a utility method the receives a path and callback function and returns to the callback a boolean value idicating if the path is a  directory of file.
    - fileReader - a module containing a method the receiving a file path and prints it's output
    - directoryReader -  a module containing a method the receiving a directory Path and prints all of the directory's files.

