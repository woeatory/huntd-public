# Project setup

## Objective
  The main purpose of this document is to provide a consolidated view of tools that Mate academy developers use daily and simplify the initial setup.

## WSL for Windows users

  Mate academy recommends using an OS that supports [docker](https://docs.google.com/document/d/1-Tc4rOG7tHXgwWoF1eihtFyE9PY28tYLO7yDgfqpvGs/edit#heading=h.fuqyowl3or2m) natively to speed up development iterations. Despite docker was built only for Linux there is a workaround for windows users: use WSL.

  Follow the official guide on [how to install the Windows Subsystem for Linux (WSL) on Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Make sure you’ve updated to WSL 2 (run wsl -l -v  in PowerShell). 

  Use the **_latest_** Ubuntu image offered.

> Note: You should first update to WSL 2 before installing any Linux distributive

![img](https://lh3.googleusercontent.com/8Ej3aVjDs5fT7l8efs9pplMnn-h0ePbcS7Jmh4sE7pq7P2oY7KQCOS2rxaijmzzQXnGERrWil7NWTpGnCaky8678ebFGnd84HxSa5gvfMmJkqdsPrY9YZKykV19HV2TbW9cIrFLUM1sE0JC5jQ)

## Windows + WSL best practices

- Install Git, Nodejs, and other tools on the Linux filesystem. There should be nothing on Windows.

- Projects files should be stored on the Linux filesystem to achieve maximum speed while working with [Docker](https://docs.google.com/document/d/1-Tc4rOG7tHXgwWoF1eihtFyE9PY28tYLO7yDgfqpvGs/edit#heading=h.bkjpukvrejjz).

## Environment
### VCS

Mate academy uses [GitHub](https://github.com/) for version control and collaboration. To work on Ma projects developer should complete the following steps:

- Create an account on GitHub - [Join GitHub](https://github.com/join)
- Install git CLI - [Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Add SSH key to GitHub - [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- Configure git aliases for better development experience - [Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)

## OS Package manager
As apt / apt-get on Linux, there is a package manager for macOS called Homebrew: [The Missing Package Manager for macOS (or Linux) — Homebrew](https://brew.sh/). It also can be used with Linux systems too.

## NodeJS

NodeJS is a JavaScript runtime.

Recommended: Install Node.js via nvm. It will allow you to easily switch between node versions.

**Go to the [nvm repo](https://github.com/nvm-sh/nvm) and follow instructions.**

> Some services require different NodeJS versions even to install dependencies. Pay attention to the [lockfileVersion property in package-lock.json](https://nitayneeman.com/posts/catching-up-with-package-lockfile-changes-in-npm-v7/). V1 requires NodeJS 14 or below with npm v6, when V2 required NodeJS 16 or above with npm v8.

## Docker

**[Get Docker](https://docs.docker.com/get-docker/)**

Docker is the de facto standard to build and share containerized apps - from desktop to the cloud.

The only issue with Docker is that it was built for Linux. It works very fast there but has some performance issues on other systems (like macOS or Windows).

To get the best from Docker, follow these steps:

### macOS users

Install docker [for mac](https://docs.docker.com/desktop/install/mac-install/)

### Windows users
- Install WSL 2
- Configure Docker to use WSL

Follow the official guide on how to configure [Docker Desktop WSL 2 backend](https://docs.docker.com/desktop/windows/wsl/).
![img](https://lh3.googleusercontent.com/flpr2tan-8AIuY3H50XanAb32YMdzcP4bhSze3onHydRthP7bw8ntbdRPwt4dyRrTQv3POhdyoYUcUKOfoMU27ZWMSPHU7pfE4uM5556xe6Qe-HSerLQXvzBCOZTkQN-FA2xc6OgonoS3sftuQ?view=open)

## PostgreSQL

Mate academy uses PostgreSQL as the main object-relational database.

PostgreSQL uses a **psql** interactive terminal to interact with DB using SQL queries.

If you are a complete beginner and unfamiliar with SQL we recommend taking out our **[SQL Basics course](https://mate.academy/learn/sql-basics).**

## Terminal

Mate academy recommends using a **“zsh”** terminal (**[basically Oh My Zsh - a delightful & open-source framework for Zsh](https://ohmyz.sh/)**) for a better development experience.

Use it with Autosuggestions & syntax highlighting plugins: **[Oh my zsh with autosuggestions & syntax-highlighting](https://gist.github.com/dogrocker/1efb8fd9427779c827058f873b94df95)**
