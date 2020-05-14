# Jacob's Scouting Prototype

## Setup

### Setting up the environment

This section details the basic setup you need to complete in order to follow the
rest of this guide.

In Windows, I recommend using WSL to access a Linux environment within Windows.  
Follow the [Microsoft instructions](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
to set this up.  
At the time of writing, WSL 2 is only in unreleased versions of Windows, so you
can skip the WSL 2 segments.
Download a distribution from the store (Ubuntu is fine) and launch it to set up your user.  
Make sure to update your packages. For Ubuntu:
```bash
sudo apt update
sudo apt upgrade
```

After this, the rest of this guide should be pretty much the same for Linux, macOS, and Windows.
Lastly, use your package manager to install Git, and then [configure it](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).  
You can then clone this respository.

### Installing Python and pipenv

Use your package manager to install Python 3 and pip.
Python may be called `python` or `python3` depending on your packager.  
For examples:
```bash
sudo apt install python3 python3-pip
```
```bash
brew install python
```
```bash
sudo pacman -S python python-pip
```

Next, use pip to install pipenv, which will help us create a virtual environment for the project.  
Note, some distributions will have pipenv directly in their repositories.  
But you can always do:
```bash
pip3 install --user pipenv
```
After this, you may need to restart your shell.

### Creating the virtual environment

With pipenv installed, you should be able to run the `pipenv` command.
If not, you can also use `python3 -m pipenv`.

Now, we'll use pipenv to install the Python dependencies for the project.  
`cd` into the respository directly, the with with Pipfile in it.
Now, you should be able to run:
```bash
pipenv sync --dev
```
The `--dev` flag tells it that we also want packages that are useful for development, as opposed to just deployment.

Assuming that succeeded, pipenv will have created a virtual environment for this project.  
We can enter the virtualenv with:
```bash
pipenv shell
```
When in the virtualenv, you should see an additional prefix in your shell prompt.
Django should now be available, even if it's not installed globally.

### Using VSCode

This project is configured for development with Visual Studio Code.
If using WSL, VSCode can connect directly to that Linux environment. Click the "Remote" icon in the very bottom-left corner of the window to open a new window connected to WSL.

You will need to open the folder containing this reposity. `File > Open Folder`.
Make sure you can see the Pipfile here.
As soon as it's open, it should let you know that there are some recommended extensions. Allow it to install the Python and Django extensions.

VSCode will not activate the Python extension until you open a Python file.  
Find any .py file and open it. This should activate the extension, and you should see a Python version in the bottom status bar.  
If everything went according to plan, it should say "pipenv" in here. Like: `Python 3.8.2 64-bit ('nilus-scouting': pipenv)`

Note that VSCode may launch a terminal when you first open the directory.
At first, it will not be in the pipenv virtualenv.
However, once the Python extension is activated, future terminals will automatically drop you into the virtualenv.
You can either close and reopen the terminal, or run `pipenv shell`.

## Project structure

TODO

## Running the development server

This repository includes a VSCode launch configuration file, so you can launch and debug the server from here.
To do so, head to the 'Run' page and click the play button, or press F5 from anywhere.

This will start the development server at localhost:8000.  
This is only for testing -- the development server must not be used in production.
You can then start accessing the pages in your browser:  
http://localhost:8000/admin  
http://localhost:8000/season2020/whatever  
http://localhost:8000/thirdexample

## Development best practices and guidelines

TODO

## Deploying

TODO