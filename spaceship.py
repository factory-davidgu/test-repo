"""A tiny spaceship simulation."""


class Spaceship:
    def __init__(self, name, fuel=100, position=(0, 0, 0)):
        self.name = name
        self.fuel = fuel
        self.position = position

    def launch(self):
        if self.fuel <= 0:
            print(f"{self.name} cannot launch: out of fuel.")
            return
        print(f"{self.name} is launching!")

    def fly(self, dx, dy, dz, fuel_cost=10):
        if self.fuel < fuel_cost:
            print(f"{self.name} does not have enough fuel to fly.")
            return
        x, y, z = self.position
        self.position = (x + dx, y + dy, z + dz)
        self.fuel -= fuel_cost
        print(f"{self.name} flew to {self.position}. Fuel remaining: {self.fuel}")

    def status(self):
        print(f"{self.name} | Fuel: {self.fuel} | Position: {self.position}")


if __name__ == "__main__":
    ship = Spaceship("Explorer I")
    ship.launch()
    ship.fly(10, 5, 0)
    ship.fly(0, 0, 20)
    ship.status()
