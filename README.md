# Rover project

## Prerequisite

- The latest version of [Bun](https://bun.sh/docs/installation) (if you are on windows, install it on WSL2)

## How to install ?

```sh
bun install
```

## How to start ?

In the first terminal:

```sh
bun start:rover
```

In the second terminal:

```sh
bun start:repeater
```

In the third terminal:

```sh
bun start:mission-control
```

## How to move the rover

In the Mission-control terminal, you can send command like

- `F` Forward
- `B` Backward
- `R` Turn right
- `L` Turn left

You can chain multiple letter at once. For example `FRF` for Forward->Turn right->Forward

## Map explanation

- `^ > v <` Rover (looking in a cardinal direction)
- `.` Unknown position
- `_` Empty position
- `O` Obstacle
